/**
 * API response type definitions
 * 
 * @module types/api
 */

/**
 * Generic API response wrapper
 */
export interface APIResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedAPIResponse<T = unknown> extends APIResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * API error response
 */
export interface APIError {
  error: string;
  statusCode: number;
  details?: Record<string, unknown>;
  timestamp: string;
}