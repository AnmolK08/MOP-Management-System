import rateLimiter from 'express-rate-limit';

const rateLimiting = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export default rateLimiting;