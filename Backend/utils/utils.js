import jwt from 'jsonwebtoken';

export const generateToken = (user, nextActivityUpdate = null) => {
    return jwt.sign({ });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ });
}