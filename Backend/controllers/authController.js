import userModel from "../models/user.js";
import db from "../config/db.js"
import config from "../config/config.js"
import jwt from 'jsonwebtoken'

import argon2 from 'argon2';

export const signup = async (req, res) => {
  try {
    const user = userModel(db)
    const { email, password, firstName, lastName } = req.body;

    // Duplicate email check should also be done before a registration can be submitted
    const existingUser = await user.findByLoginEmail(email);
    if (existingUser != null) {
      return res.status(409).json({
        message: 'Email already in use'
      })
    }

    let hash = await argon2.hash(password);
    let userId = await user.registerUser(firstName, lastName, email, hash);

    return res.status(201).json({
      id: userId,
      email: email,
      firstName: firstName,
      lastName: lastName
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

export const login = async (req, res) => {
  try {
    const user = userModel(db);
    const { email, password } = req.body;

    const existingUser = await user.findByLoginEmail(email);

    let authenticated = false;
    if (existingUser != null) {
      authenticated = argon2.verify(existingUser.password_hash, password);
    }

    if (!authenticated || existingUser == null) {
      return res.status(401).json({message: "Invalid email or password"});
    }

    let tokenUser = {id: existingUser.id, email: existingUser.login_email}

    let token = jwt.sign(tokenUser, config.JWT_SECRET)
    

    return res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({ message: 'Logged out [TO BE IMPLEMENTED!]' });
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
