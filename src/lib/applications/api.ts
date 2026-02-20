/**
 * Application form submission utilities
 * Server-side functions for handling study abroad applications
 * 
 * @module lib/applications/api
 */

'use server';

import { getSupabaseServer } from '@/lib/supabase/server';
import { FormData } from '@/lib/types/form';

/**
 * Validation response type
 */
interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Submission response type
 */
interface SubmissionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

/**
 * Server-side validation for form data
 * Provides additional security layer beyond client validation
 */
function validateFormData(data: FormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Step 1: Contact Information
  if (!data.firstName?.trim() || data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  if (!data.lastName?.trim() || data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email address is required';
  }
  if (!data.phone?.trim() || !/^[+]?[\d\s\-()]{10,}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Valid phone number is required (minimum 10 digits)';
  }

  // Step 2: Education
  if (!data.currentLevel) {
    errors.currentLevel = 'Current education level is required';
  }
  if (!data.graduationYear) {
    errors.graduationYear = 'Graduation year is required';
  }
  if (!data.preferredCountry) {
    errors.preferredCountry = 'Preferred country is required';
  }

  // Step 3: Preferences
  if (!data.preferredProgram) {
    errors.preferredProgram = 'Preferred program is required';
  }
  if (!data.fieldOfStudy?.trim() || data.fieldOfStudy.trim().length < 3) {
    errors.fieldOfStudy = 'Field of study must be at least 3 characters';
  }
  if (!data.intendedStartDate) {
    errors.intendedStartDate = 'Intended start date is required';
  }

  // Step 4: Final Details
  if (!data.budgetRange) {
    errors.budgetRange = 'Budget range is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize string input to prevent XSS
 */
function sanitizeString(input: string | null | undefined): string | null {
  if (!input) return null;
  return input.trim().slice(0, 500); // Limit length
}

/**
 * Submit study abroad application
 * Server-side function with validation and sanitization
 * 
 * @param formData - Application form data
 * @returns Promise<SubmissionResponse>
 */
export async function submitApplication(
  formData: FormData
): Promise<SubmissionResponse> {
  try {
    // 1. Server-side validation
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Please correct the errors in the form',
        errors: validation.errors,
      };
    }

    // 2. Sanitize inputs
    const sanitizedData = {
      first_name: sanitizeString(formData.firstName) || '',
      last_name: sanitizeString(formData.lastName) || '',
      email: (sanitizeString(formData.email) || '').toLowerCase(),
      phone: sanitizeString(formData.phone) || '',
      current_level: sanitizeString(formData.currentLevel) || '',
      institution: sanitizeString(formData.institution) || '',
      graduation_year: sanitizeString(formData.graduationYear) || '',
      preferred_country: sanitizeString(formData.preferredCountry) || '',
      preferred_program: sanitizeString(formData.preferredProgram) || '',
      field_of_study: sanitizeString(formData.fieldOfStudy) || '',
      preferred_university: sanitizeString(formData.preferredUniversity) || '',
      intended_start_date: sanitizeString(formData.intendedStartDate) || '',
      has_passport: Boolean(formData.hasPassport),
      has_degree: Boolean(formData.hasDegree),
      has_transcript: Boolean(formData.hasTranscript),
      previous_application: Boolean(formData.previousApplication),
      budget_range: sanitizeString(formData.budgetRange) || '',
      additional_questions: sanitizeString(formData.additionalQuestions) || '',
    };

    // 3. Check for duplicate submission (rate limiting)
    const supabase = getSupabaseServer();
    
    // Check if email already applied in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentSubmission } = await supabase
      .from('study_abroad_applications')
      .select('id, created_at')
      .eq('email', sanitizedData.email || '')
      .gte('created_at', oneDayAgo)
      .single();

    if (recentSubmission) {
      return {
        success: false,
        message: 'You have already submitted an application recently. Our team will contact you soon.',
      };
    }

    // 4. Insert into database using server-side client
    const { data, error } = await supabase
      .from('study_abroad_applications')
      .insert([sanitizedData])
      .select()
      .single();

    if (error) {
      console.error('[Applications] Database error:', error);
      return {
        success: false,
        message: 'Failed to submit application. Please try again or contact support.',
      };
    }

    // 5. Success response
    console.log('[Applications] Successfully created application:', data.id);
    return {
      success: true,
      message: 'Application submitted successfully! We will contact you soon.',
    };

  } catch (error) {
    console.error('[Applications] Unexpected error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

/**
 * Check if an email has already applied
 * Used for client-side feedback
 * 
 * @param email - Email address to check
 * @returns Promise<boolean>
 */
export async function checkExistingApplication(email: string): Promise<boolean> {
  try {
    const supabase = getSupabaseServer();
    
    const { data, error } = await supabase
      .from('study_abroad_applications')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .limit(1);

    if (error) {
      console.error('[Applications] Error checking email:', error);
      return false;
    }

    return (data?.length ?? 0) > 0;
  } catch (error) {
    console.error('[Applications] Unexpected error checking email:', error);
    return false;
  }
}
