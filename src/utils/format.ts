/**
 * Formatting Utility Functions
 * 
 * Provides consistent formatting across the application
 * 
 * @module lib/utils/format
 */

/**
 * Formats a date string to a human-readable format
 * 
 * @param dateString - ISO 8601 date string
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date string
 * 
 * @example
 * formatDate('2024-01-15T00:00:00Z') // "Jan 15, 2024"
 */
export function formatDate(
  dateString: string,
  locale: string = 'en-US'
): string {
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('[formatDate] Invalid date string:', dateString);
    return 'Invalid date';
  }
}

/**
 * Truncates text to a specified length and adds ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns Truncated text
 * 
 * @example
 * truncateText('Hello world', 5) // "Hello..."
 */
export function truncateText(
  text: string | undefined | null,
  maxLength: number,
  ellipsis: string = '...'
): string {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + ellipsis;
}

/**
 * Formats currency amount
 * 
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1234.56, 'USD') // "$1,234.56"
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('[formatCurrency] Formatting error:', error);
    return `${currency} ${amount}`;
  }
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 * 
 * @example
 * capitalizeFirst('hello') // "Hello"
 */
export function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a slug to title case
 * 
 * @param slug - Slug string (e.g., 'study-in-canada')
 * @returns Title case string (e.g., 'Study In Canada')
 * 
 * @example
 * slugToTitle('study-in-canada') // "Study In Canada"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalizeFirst(word))
    .join(' ');
}