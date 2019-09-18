import * as RateLimit from 'express-rate-limit';

const windowMin = parseInt(process.env.API_RATE_LIMIT_WINDOW_MINUTES as string, 10);
const maxRequests = parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS as string, 10);

export const rateLimitMiddleware = new RateLimit({
  windowMs: windowMin * 60 * 1000,
  max: maxRequests,
});
