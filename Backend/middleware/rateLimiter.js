import rateLimit from 'express-rate-limit'

let duration = 15 * 60 * 1000
let limit = 1000
let standardHeaders = true
let legacyHeaders = false

export const generalAPILimiter = rateLimit({
    windowMs: duration,
    limit: limit,
    standardHeaders: standardHeaders,
    legacyHeaders: legacyHeaders,
    message: { success: false, message: 'Request limit exceeded, please try again later.' }
})