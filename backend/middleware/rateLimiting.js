import rateLimiter from 'express-rate-limit';

const rateLimiting = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export const healthRateLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // 1 minutes 
    max: 10, // Allow 10 requests per 1 minutes 
    message: 'Health check rate limit exceeded. Please try again later.',
    standardHeaders: true, 
    legacyHeaders: false,
});

export default rateLimiting;