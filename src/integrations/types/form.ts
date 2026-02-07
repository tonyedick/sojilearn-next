export interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Step 2: Education Background
  currentLevel: string;
  institution: string;
  graduationYear: string;
  preferredCountry: string;

  // Step 3: Study Preferences
  preferredProgram: string;
  fieldOfStudy: string;
  preferredUniversity: string;
  intendedStartDate: string;

  // Step 4: Additional Information
  hasDegree: boolean;
  hasTranscript: boolean;
  hasPassport: boolean;
  previousApplication: boolean;
  budgetRange: string;
  additionalQuestions: string;
}

export interface FormErrors {
  [key: string]: string;
}