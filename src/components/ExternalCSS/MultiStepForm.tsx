'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, User, GraduationCap, Target, FileText, Loader2 } from 'lucide-react';
import { FormData, FormErrors } from '../../integrations/types/form';
import { supabase } from '../../integrations/supabase/client';
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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
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

  // const fillTestData = (profile?: 'waec_graduate' | 'undergraduate' | 'graduate' | 'working_professional') => {
  //   const testData = profile ? getTestDataByProfile(profile) : generateTestData();
  //   setFormData(testData);
  //   setErrors({});
  //   setSubmitError('');
  // };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const { error } = await supabase
        .from('study_abroad_applications')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          current_level: formData.currentLevel,
          institution: formData.institution || null,
          graduation_year: formData.graduationYear,
          preferred_country: formData.preferredCountry,
          preferred_program: formData.preferredProgram,
          field_of_study: formData.fieldOfStudy,
          preferred_university: formData.preferredUniversity || null,
          intended_start_date: formData.intendedStartDate,
          has_passport: formData.hasPassport,
          has_degree: formData.hasDegree,
          has_transcript: formData.hasTranscript,
          previous_application: formData.previousApplication,
          budget_range: formData.budgetRange,
          additional_questions: formData.additionalQuestions || null,
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitError(`Failed to submit form: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="tw-max-w-2xl tw-mx-auto tw-px-4 tw-py-16">
        <div className="tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-p-8 tw-text-center">
          <div className="tw-w-20 tw-h-20 tw-bg-green-100 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-6">
            <CheckCircle className="tw-w-10 tw-h-10 tw-text-green-600" />
          </div>
          <h2 className="tw-text-3xl tw-font-bold tw-text-gray-900 tw-mb-4">Thank You!</h2>
          <p className="tw-text-lg tw-text-gray-600 tw-mb-6">
            Your application has been submitted successfully. Our team will review your information and contact you within 24 hours.
          </p>
          <div className="tw-bg-blue-50 tw-rounded-xl tw-p-6">
            <h3 className="tw-font-semibold tw-text-blue-900 tw-mb-2">What happens next?</h3>
            <ul className="tw-text-sm tw-text-blue-800 tw-space-y-1 tw-text-left">
              <li>• Our counselors will review your profile</li>
              <li>• We will schedule a consultation call</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tw-max-w-4xl tw-mx-auto tw-px-4 tw-py-16">
      <div className="tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-overflow-hidden">
        {/* Progress Header */}
        <div className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-700 tw-px-8 tw-py-6">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
            <h2 className="tw-text-2xl tw-font-bold tw-text-white">Get Started Today</h2>
            <span className="tw-text-blue-100">Step {currentStep} of 4</span>
          </div>
          <div className="tw-flex tw-items-center tw-space-x-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="tw-flex tw-items-center">
                  <div className={`tw-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-border-2 tw-transition-all ${
                    isCompleted 
                      ? 'tw-bg-green-500 tw-border-green-500 tw-text-white' 
                      : isActive 
                        ? 'tw-bg-white tw-border-white tw-text-blue-600' 
                        : 'tw-border-blue-300 tw-text-blue-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="tw-w-5 tw-h-5" />
                    ) : (
                      <Icon className="tw-w-5 tw-h-5" />
                    )}
                  </div>
                  <span className={`tw-ml-2 tw-text-sm tw-font-medium ${
                    isActive ? 'tw-text-white' : 'tw-text-blue-200'
                  }`}>
                    {step.title}
                  </span>
                  {step.number < 4 && (
                    <div className={`tw-w-8 tw-h-0.5 tw-mx-4 ${
                      isCompleted ? 'tw-bg-green-500' : 'tw-bg-blue-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="tw-p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="tw-space-y-6">
              <div>
                <h3 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">Contact</h3>
                <p className="tw-text-gray-600">Let us start with your basic details</p>
              </div>
              
              <div className="tw-grid md:tw-grid-cols-2 tw-gap-6">
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                      errors.firstName ? 'tw-border-red-500' : 'tw-border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                      errors.lastName ? 'tw-border-red-500' : 'tw-border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.email ? 'tw-border-red-500' : 'tw-border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
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
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.phone ? 'tw-border-red-500' : 'tw-border-gray-300'
                  }`}
                  placeholder="+2345551234567"
                />
                {errors.phone && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Education Background */}
          {currentStep === 2 && (
            <div className="tw-space-y-6">
              <div>
                <h3 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">Education Background</h3>
                <p className="tw-text-gray-600">Tell us about your current education status</p>
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Current Education Level *
                </label>
                <select
                  value={formData.currentLevel}
                  onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.currentLevel ? 'tw-border-red-500' : 'tw-border-gray-300'
                  }`}
                >
                  <option value="">Select your current level</option>
                  <option value="Waec_graduate">Secondary School Certificate Holder</option>
                  <option value="Undergraduate">Current Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Working_professional">Working Professional</option>
                </select>
                {errors.currentLevel && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.currentLevel}</p>}
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Current/Previous Institution
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all"
                  placeholder="Enter your school/university name"
                />
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Graduation Year *
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.graduationYear ? 'tw-border-red-500' : 'tw-border-gray-300'
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
                {errors.graduationYear && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.graduationYear}</p>}
              </div>


              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Preferred Country *
                </label>
                <select
                  value={formData.preferredCountry}
                  onChange={(e) => handleInputChange('preferredCountry', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.preferredCountry ? 'tw-border-red-500' : 'tw-border-gray-300'
                  }`}
                >
                  <option value="">Select your preferred country</option>
                  <option value="Canada">Canada</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Germany">Germany</option>
                  <option value="Malta">Malta</option>
                </select>
                {errors.preferredCountry && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.preferredCountry}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Study Preferences */}
          {currentStep === 3 && (
            <div className="tw-space-y-6">
              <div>
                <h3 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">Study Preferences</h3>
                <p className="tw-text-gray-600">What would you like to study in the UK?</p>
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Preferred Program Level *
                </label>
                <select
                  value={formData.preferredProgram}
                  onChange={(e) => handleInputChange('preferredProgram', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.preferredProgram ? 'tw-border-red-500' : 'tw-border-gray-300'
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
                {errors.preferredProgram && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.preferredProgram}</p>}
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.fieldOfStudy ? 'tw-border-red-500' : 'tw-border-gray-300'
                  }`}
                  placeholder="e.g., Computer Science, Business, Medicine"
                />
                {errors.fieldOfStudy && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.fieldOfStudy}</p>}
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Preferred Universities (Optional)
                </label>
                <textarea
                  value={formData.preferredUniversity}
                  onChange={(e) => handleInputChange('preferredUniversity', e.target.value)}
                  className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all"
                  rows={3}
                  placeholder="List any specific universities you're interested in"
                />
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Intended Start Date *
                </label>
                <select
                  value={formData.intendedStartDate}
                  onChange={(e) => handleInputChange('intendedStartDate', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.intendedStartDate ? 'tw-border-red-500' : 'tw-border-gray-300'
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
                {errors.intendedStartDate && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.intendedStartDate}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {currentStep === 4 && (
            <div className="tw-space-y-6">
              <div>
                <h3 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">Final Details</h3>
                <p className="tw-text-gray-600">Just a few more questions to help us serve you better</p>
              </div>

              <div className="tw-space-y-4">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <input
                    type="checkbox"
                    id="hasPassport"
                    checked={formData.hasPassport}
                    onChange={(e) => handleInputChange('hasPassport', e.target.checked)}
                    className="tw-w-5 tw-h-5 tw-text-blue-600 tw-border-gray-300 tw-rounded tw-focus:ring-blue-500"
                  />
                  <label htmlFor="hasPassport" className="tw-text-sm tw-font-medium tw-text-gray-700">
                    I have my International passport
                  </label>
                </div>

                <div className="tw-flex tw-items-center tw-space-x-3">
                  <input
                    type="checkbox"
                    id="hasDegree"
                    checked={formData.hasDegree}
                    onChange={(e) => handleInputChange('hasDegree', e.target.checked)}
                    className="tw-w-5 tw-h-5 tw-text-blue-600 tw-border-gray-300 tw-rounded tw-focus:ring-blue-500"
                  />
                  <label htmlFor="hasDegree" className="tw-text-sm tw-font-medium tw-text-gray-700">
                    I have my official degree certificate
                  </label>
                </div>

                <div className="tw-flex tw-items-center tw-space-x-3">
                  <input
                    type="checkbox"
                    id="hasTranscript"
                    checked={formData.hasTranscript}
                    onChange={(e) => handleInputChange('hasTranscript', e.target.checked)}
                    className="tw-w-5 tw-h-5 tw-text-blue-600 tw-border-gray-300 tw-rounded tw-focus:ring-blue-500"
                  />
                  <label htmlFor="hasTranscript" className="tw-text-sm tw-font-medium tw-text-gray-700">
                    I have my transcript (study copy)
                  </label>
                </div>

                <div className="tw-flex tw-items-center tw-space-x-3">
                  <input
                    type="checkbox"
                    id="previousApplication"
                    checked={formData.previousApplication}
                    onChange={(e) => handleInputChange('previousApplication', e.target.checked)}
                    className="tw-w-5 tw-h-5 tw-text-blue-600 tw-border-gray-300 tw-rounded tw-focus:ring-blue-500"
                  />
                  <label htmlFor="previousApplication" className="tw-text-sm tw-font-medium tw-text-gray-700">
                    I have previously applied to a university abroad
                  </label>
                </div>
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Budget Range (Annual Tuition + Living) *
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  className={`tw-w-full tw-px-4 tw-py-3 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all ${
                    errors.budgetRange ? 'tw-border-red-500' : 'tw-border-gray-300'
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
                {errors.budgetRange && <p className="tw-text-red-500 tw-text-sm tw-mt-1">{errors.budgetRange}</p>}
              </div>

              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                  Additional Questions or Comments
                </label>
                <textarea
                  value={formData.additionalQuestions}
                  onChange={(e) => handleInputChange('additionalQuestions', e.target.value)}
                  className="tw-w-full tw-px-4 tw-py-3 tw-border tw-border-gray-300 tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-transition-all"
                  rows={4}
                  placeholder="Any specific questions or additional information you'd like to share?"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="tw-flex tw-justify-between tw-items-center tw-pt-8 tw-border-t tw-border-gray-200">
            {/* Submit Error Display */}
            {submitError && (
              <div className="tw-w-full tw-mb-4 tw-p-4 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-xl">
                <p className="tw-text-red-700 tw-text-sm">{submitError}</p>
              </div>
            )}
            
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`tw-flex tw-items-center tw-space-x-2 tw-px-6 tw-py-3 tw-rounded-xl tw-font-medium tw-transition-all ${
                currentStep === 1
                  ? 'tw-text-gray-400 tw-cursor-not-allowed'
                  : 'tw-text-gray-600 tw-hover:text-gray-800 tw-hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="tw-w-5 tw-h-5" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="tw-flex tw-items-center tw-space-x-2 theme-bg tw-hover:bg-blue-700 tw-text-white tw-px-6 tw-py-3 tw-rounded-xl tw-font-medium tw-transition-all"
              >
                <span>Next</span>
                <ChevronRight className="tw-w-5 tw-h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="tw-flex tw-items-center tw-space-x-2 tw-bg-orange-500 tw-hover:bg-orange-600 tw-disabled:bg-orange-300 tw-disabled:cursor-not-allowed tw-text-white tw-px-8 tw-py-3 tw-rounded-xl tw-font-medium tw-transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="tw-w-5 tw-h-5 tw-animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="tw-w-5 tw-h-5" />
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