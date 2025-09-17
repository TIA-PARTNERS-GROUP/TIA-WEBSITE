import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import db from '../config/db.js'
import userModel from '../models/user.js'
import crypto from 'crypto';

/**
 * Middleware to verify JWT from Authorization header.
 * Expects header format: "Authorization: Bearer <token>"
 */
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid authorization format' });
    }

    const token = tokenParts[1];

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      // Store decoded payload in request for later use
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error verifying token' });
  }
};

export const verifyRefreshToken = async (req, res, next) => {
    try {
        const user = userModel(db)
    
        // 1. Check they actually provided a token
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: 'Refresh token missing' });

        //2. Check that token isn't made up
        const tokenHash = crypto.createHash("sha512").update(token).digest('hex');
        const session = await user.fetchSessionFromHash(tokenHash);
        if (session == null) return res.status(403).json({ message: 'Invalid or expired refresh token.' });

        //3. Check whether the token has expired or been revoked
        const now = new Date();
        const tokenExpiry = new Date(session.expires_at.toString().replace(" ", "T"));
        if (now > tokenExpiry || session.revoked_at != null) return res.status(403).json({message: 'Invalid or expired refresh token'});

        //4. Check that token hasn't been superseded (with a grace period of 30s)
        // Grace period is for race conditions.
        // TODO revoke the full token chain in the event that an obsolete refresh token is provided
        if (session.rotated_to_id) {
          const newerSession = await user.fetchSessionFromId(session.rotated_to_id);
          if (newerSession == null) return res.status(500).json({message: "Internal server error"}); // Bad if happens
          const newTokenCreatedAt = new Date(newerSession.created_at.toString().replace(" ", "T"));
          if (new Date(now.getTime() + 30 * 1000) > newTokenCreatedAt) return res.status(403).json({message: "Obsolete token"})
        }

        req.refreshToken = session;
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }


}

/**
 * Strict JWT verification middleware with real-time account status check
 * Use this for sensitive routes that require immediate account status verification
 */
export const verifyTokenAndAccountStatus = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

/**
 * Middleware: Temporary fake authentication for development/testing.
 * Simulates a logged-in user by injecting a dummy user into `req.user`.
 * Remove or replace this in production.
 */
export const tempFakeAuth = (req, res, next) => {
    try {

    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};