'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, User, GraduationCap, Target, FileText, Loader2 } from 'lucide-react';
import { FormData, FormErrors } from '../../integrations/types/form';
import { submitApplication } from '@/lib/applications/api';
import { useAnalytics } from '@/hooks/useAnalytics';
import './main.css';

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  currentLevel: '',
  institution: '',
  graduationYear: '',
  preferredCountry: '',
  preferredProgram: '',
  fieldOfStudy: '',
  preferredUniversity: '',
  intendedStartDate: '',
  hasPassport: false,
  hasDegree: false,
  hasTranscript: false,
  previousApplication: false,
  budgetRange: '',
  additionalQuestions: '',
};

export default function MultiStepForm() {
  const { trackButtonClick, trackConversion } = useAnalytics();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const steps = [
    { number: 1, title: 'Contact', icon: User },
    { number: 2, title: 'Education', icon: GraduationCap },
    { number: 3, title: 'Preferences', icon: Target },
    { number: 4, title: 'Final', icon: FileText },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    setSubmitError(''); // Clear any previous submit errors

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        else if (formData.firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters';
        
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        else if (formData.lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
        
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid phone number';
        break;
        
      case 2:
        if (!formData.currentLevel) newErrors.currentLevel = 'Current level is required';
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        if (!formData.preferredCountry) newErrors.preferredCountry = 'Preferred country is required';
        break;
        
      case 3:
        if (!formData.preferredProgram) newErrors.preferredProgram = 'Preferred program is required';
        if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
        else if (formData.fieldOfStudy.trim().length < 3) newErrors.fieldOfStudy = 'Field of study must be at least 3 characters';
        if (!formData.intendedStartDate) newErrors.intendedStartDate = 'Start date is required';
        break;
        
      case 4:
        if (!formData.budgetRange) newErrors.budgetRange = 'Budget range is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      const nextStep = Math.min(currentStep + 1, 4);
      setCurrentStep(nextStep);

      // Track step progression
      await trackButtonClick(
        `form_step_${nextStep}`,
        'application_form',
        `Advanced to step ${nextStep}`
      );
    } else {
      // Track validation errors
      await trackButtonClick(
        `form_step_${currentStep}_error`,
        'application_form',
        `Validation failed on step ${currentStep}`
      );
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      await trackButtonClick(
        'form_submission_failed',
        'application_form',
        'Final validation failed'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Call secure Server Action instead of direct database access
      const response = await submitApplication(formData);

      if (!response.success) {
        // Handle validation or submission errors
        if (response.errors) {
          setErrors(response.errors);
        }
        setSubmitError(response.message);

        // Track submission error
        await trackButtonClick(
          'form_submission_error',
          'application_form',
          response.message
        );
        return;
      }

      // Track successful form submission
      await trackConversion(
        'application_form_submission',
        null,
        formData.email
      );

      // Track country-specific conversion
      await trackButtonClick(
        `application_submitted_${formData.preferredCountry}`,
        'application_form',
        `Application submitted for ${formData.preferredCountry}`
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitError('An unexpected error occurred. Please try again later.');

      // Track general submission error
      await trackButtonClick(
        'form_submission_failed',
        'application_form',
        errorMessage
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your application has been submitted successfully. Our team will review your information and contact you within 24 hours.
          </p>
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• Our counselors will review your profile</li>
              <li>• We will schedule a consultation call</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Get Started Today</h2>
            <span className="text-blue-100">Step {currentStep} of 4</span>
          </div>
          <div className="flex items-center space-x-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-white border-white text-blue-600' 
                        : 'border-blue-300 text-blue-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-white' : 'text-blue-200'
                  }`}>
                    {step.title}
                  </span>
                  {step.number < 4 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-600">Let us start with your basic details</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9+\-\s()]*"
                  value={formData.phone}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^\d+()\s-]/g, '');
                    handleInputChange('phone', input.value);
                  }}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+2345551234567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Education Background */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Education Background</h3>
                <p className="text-gray-600">Tell us about your current education status</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Education Level *
                </label>
                <select
                  value={formData.currentLevel}
                  onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.currentLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your current level</option>
                  <option value="Waec_graduate">Secondary School Certificate Holder</option>
                  <option value="Undergraduate">Current Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Working_professional">Working Professional</option>
                </select>
                {errors.currentLevel && <p className="text-red-500 text-sm mt-1">{errors.currentLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current/Previous Institution
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your school/university name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year *
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.graduationYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select graduation year</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="Before_2020">Before 2020</option>
                </select>
                {errors.graduationYear && <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Country *
                </label>
                <select
                  value={formData.preferredCountry}
                  onChange={(e) => handleInputChange('preferredCountry', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.preferredCountry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your preferred country</option>
                  <option value="Canada">Canada</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="Malta">Malta</option>
                </select>
                {errors.preferredCountry && <p className="text-red-500 text-sm mt-1">{errors.preferredCountry}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Study Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Study Preferences</h3>
                <p className="text-gray-600">What would you like to study in the UK?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Program Level *
                </label>
                <select
                  value={formData.preferredProgram}
                  onChange={(e) => handleInputChange('preferredProgram', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.preferredProgram ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select program level</option>
                  <option value="Alevels">A Levels</option>
                  <option value="Foundation">Foundation Course</option>
                  <option value="Undergraduate">Undergraduate (Bachelors)</option>
                  <option value="MSC">Postgraduate (Masters)</option>
                  <option value="MRES">MRes (Master by Research)</option>
                  <option value="PHD">PhD</option>
                  <option value="Professional">Professional Course</option>
                </select>
                {errors.preferredProgram && <p className="text-red-500 text-sm mt-1">{errors.preferredProgram}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Computer Science, Business, Medicine"
                />
                {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Universities (Optional)
                </label>
                <textarea
                  value={formData.preferredUniversity}
                  onChange={(e) => handleInputChange('preferredUniversity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="List any specific universities you're interested in"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intended Start Date *
                </label>
                <select
                  value={formData.intendedStartDate}
                  onChange={(e) => handleInputChange('intendedStartDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.intendedStartDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select start date</option>
                  <option value="January_2026">January 2026</option>
                  <option value="February_2026">February 2026</option>
                  <option value="March_2026">March 2026</option>
                  <option value="May_2026">May 2026</option>
                  <option value="September_2026">September 2026</option>
                  <option value="November_2026">November 2026</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.intendedStartDate && <p className="text-red-500 text-sm mt-1">{errors.intendedStartDate}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Final Details</h3>
                <p className="text-gray-600">Just a few more questions to help us serve you better</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasPassport"
                    checked={formData.hasPassport}
                    onChange={(e) => handleInputChange('hasPassport', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasPassport" className="text-sm font-medium text-gray-700">
                    I have my International passport
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasDegree"
                    checked={formData.hasDegree}
                    onChange={(e) => handleInputChange('hasDegree', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasDegree" className="text-sm font-medium text-gray-700">
                    I have my official degree certificate
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hasTranscript"
                    checked={formData.hasTranscript}
                    onChange={(e) => handleInputChange('hasTranscript', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasTranscript" className="text-sm font-medium text-gray-700">
                    I have my transcript (study copy)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="previousApplication"
                    checked={formData.previousApplication}
                    onChange={(e) => handleInputChange('previousApplication', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="previousApplication" className="text-sm font-medium text-gray-700">
                    I have previously applied to a university abroad
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range (Annual Tuition + Living) *
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.budgetRange ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select budget range</option>
                  <option value="Under_$20k">Under $20,000</option>
                  <option value="20k_$30k">$20,000 - $30,000</option>
                  <option value="30k_$40k">$30,000 - $40,000</option>
                  <option value="40k_$50k">$40,000 - $50,000</option>
                  <option value="Over_$50k">Over $50,000</option>
                  <option value="Need_guidance">Need guidance on budgeting</option>
                </select>
                {errors.budgetRange && <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Questions or Comments
                </label>
                <textarea
                  value={formData.additionalQuestions}
                  onChange={(e) => handleInputChange('additionalQuestions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Any specific questions or additional information you'd like to share?"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            {/* Submit Error Display */}
            {submitError && (
              <div className="w-full mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}
            
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 theme-bg hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}