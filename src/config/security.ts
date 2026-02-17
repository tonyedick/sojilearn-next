/**
 * Security Configuration
 * 
 * Centralized security settings and constants
 * 
 * @module config/security
 */

/**
 * Rate limiting configuration
 * TODO: Implement rate limiting middleware
 */
export const RATE_LIMITS = {
  // API requests per minute
  API_REQUESTS_PER_MINUTE: 60,
  
  // Blog posts API
  BLOG_API_PER_MINUTE: 30,
} as const;

/**
 * CORS configuration
 */
export const CORS_CONFIG = {
  allowedOrigins: process.env.NODE_ENV === 'production' 
    ? ['https://www.sojilearn.com'] 
    : ['http://localhost:3000'],
  
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  
  allowedHeaders: ['Content-Type', 'Authorization'],
} as const;

/**
 * Content Security Policy
 */
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", process.env.NEXT_PUBLIC_SUPABASE_URL!].filter(Boolean),
} as const;

/**
 * Session configuration
 */
export const SESSION_CONFIG = {
  // Session timeout in milliseconds (1 hour)
  timeout: 60 * 60 * 1000,
  
  // Refresh token before expiry (5 minutes)
  refreshThreshold: 5 * 60 * 1000,
} as const;