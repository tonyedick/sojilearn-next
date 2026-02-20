/**
 * Validation Utility Functions
 * 
 * Provides common validation functions used across the application
 * 
 * @module lib/utils/validation
 */

import { COUNTRIES, type Country } from '@/lib/types/common';

/**
 * Validates if a string is a valid email address
 * 
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is a valid URL
 * 
 * @param url - URL string to validate
 * @returns true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a country name is in the allowed list
 * 
 * @param country - Country name to validate
 * @returns true if valid, false otherwise
 */
export function isValidCountry(country: string): country is Country {
  return COUNTRIES.includes(country as Country);
}

/**
 * Sanitizes a string by removing potentially dangerous characters
 * 
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}

/**
 * Validates a phone number (basic validation)
 * 
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  // Basic validation: allows numbers, spaces, +, -, (, )
  const phoneRegex = /^[\d\s+\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}