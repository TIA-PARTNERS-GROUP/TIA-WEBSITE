import userModel from "../models/user.js";
import db from "../config/db.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken';

import crypto from 'crypto';
import argon2 from 'argon2';

export const signup = async (req, res) => {
  try {
    const user = userModel(db)
    const { email, password, firstName, lastName, company, category, phone, description} = req.body;

    // Duplicate email check should also be done before a registration can be submitted
    const existingUser = await user.findByLoginEmail(email);
    if (existingUser != null) {
      return res.status(409).json({
        message: 'Email already in use'
      })
    }

    let hash = await argon2.hash(password);
    let userId = await user.registerUser(firstName, lastName, email, hash, company, category, phone, description);

    return res.status(201).json({
      id: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      companyName: company,
      businessCategory: category,
      contactPhone: phone,
      description: description
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    //const { token } = req.query;

    return res.status(200).json({ message: 'Email verified [TO BE IMPLEMENTED!]' });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    return res.status(200).json({ message: 'Verification email resent [TO BE IMPLEMENTED!]' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const refresh = async (req, res) => {
  try {
    const user = userModel(db);
    const existingUser = await user.infoFromId(req.refreshToken.user_id)
    if (existingUser == null) return res.status(500).json({message: "Internal server error"}) // How did we get here??
    let tokenUser = {id: existingUser.id, email: existingUser.login_email};
    const token = jwt.sign(tokenUser, config.JWT_SECRET, {expiresIn: "5m"});

    
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenHash = crypto.createHash('sha512').update(refreshToken).digest('hex');
    const refreshTokenCreatedTimestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')

    user.rotateSession(existingUser.id, refreshTokenHash, refreshTokenCreatedTimestamp, req.refreshToken.expires_at, req.refreshToken.id)

    res.cookie("refreshToken", refreshToken);
    return res.status(200).json({
      message: 'Refresh successful',
      token: token
    });


  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const user = userModel(db);
    const { email, password } = req.body;

    const existingUser = await user.findByLoginEmail(email);

    if (existingUser == null) {
      return res.status(401).json({message: "Invalid email or password"});
    }

    let authenticated = await argon2.verify(existingUser.password_hash, password);

    if (!authenticated) {
      return res.status(401).json({message: "Invalid email or password"});
    }

    let tokenUser = {id: existingUser.user_id, email: existingUser.login_email};

    const token = jwt.sign(tokenUser, config.JWT_SECRET, {expiresIn: "5m"});

    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenHash = crypto.createHash('sha512').update(refreshToken).digest('hex');

    const refreshTokenDuration = 1000 * 60 * 60 * 24 * 14 // 14 days, in milliseconds
    const refreshTokenCreatedTimestamp = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')
    const refreshTokenExpiry = new Date(Date.now() + (refreshTokenDuration)).toISOString().slice(0, 19).replace('T', ' ')

    user.addNewSession(
      existingUser.user_id, 
      refreshTokenHash, 
      refreshTokenCreatedTimestamp,
      refreshTokenExpiry
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,         
      secure: false,           
      sameSite: "lax",
      maxAge: refreshTokenDuration
    });
    
    return res.status(200).json({
      message: 'Login successful',
      token: token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {

    const user = userModel(db);
    user.revokeSession(req.refreshToken.id)
    res.clearCookie("refreshToken");
    return res.status(200).json({message: 'Successfully logged out'})
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({message: 'Internal server error'})
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    return res.status(200).json({ message: 'Reset link sent [TO BE IMPLEMENTED!]' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    //const { token } = req.validatedParams;
    const { newPassword } = req.validatedBody

    return res.status(200).json({ message: 'Password reset [TO BE IMPLEMENTED!]' });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};
