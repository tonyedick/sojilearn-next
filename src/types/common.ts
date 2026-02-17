/**
 * Common type definitions used across the application
 * 
 * @module types/common
 */

/**
 * Supported study destinations
 */
export const COUNTRIES = ['Canada', 'UK', 'USA', 'Germany', 'Malta'] as const;
export type Country = typeof COUNTRIES[number];

/**
 * FAQ item structure
 */
export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

/**
 * Country information
 */
export interface CountryInfo {
  name: Country;
  slug: string;
  code: string;
  flag: string;
  processingFee: number;
  currency: string;
}

/**
 * Navigation link
 */
export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}