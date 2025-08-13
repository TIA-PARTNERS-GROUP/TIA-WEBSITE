import jwt from 'jsonwebtoken';
import config from '../config/config.js';
/**
 * Middleware: Verifies access token from Authorization header.
 * Checks if token is present and valid.
 */
export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ message: 'Token missing' });

        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid or expired token' });
            req.user = user; // Attach user payload to request
            next();
        });

    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

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