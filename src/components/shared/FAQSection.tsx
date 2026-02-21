'use client';

/**
 * Reusable FAQ Section Component
 * 
 * Provides an accordion-style FAQ section that can be used across different pages
 * This eliminates code duplication across country-specific FAQ components
 * 
 * @component
 * @example
 * ```tsx
 * <FAQSection 
 *   faqs={faqItems}
 *   title="Frequently Asked Questions"
 *   showImage={true}
 * />
 * ```
 */

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from 'lucide-react';
import { FAQItem } from '@/lib/types';
import faqImage from '@/assets/img/side-1.png';

interface FAQSectionProps {
  /** Array of FAQ items to display */
  faqs: FAQItem[];
  
  /** Section title (optional) */
  title?: string;
  
  /** Whether to show the side image (optional) */
  showImage?: boolean;
  
  /** Custom background color (optional) */
  backgroundColor?: string;
  
  /** Image to display (optional, overrides default) */
  image?: any;
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  showImage = true,
  backgroundColor = 'gray',
  image = faqImage,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={backgroundColor}>
      <div className="container">
        <div className="row justify-content-left">
          {/* FAQ Content */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="sec-heading center">
              <h2>
                {title.split('Questions').length > 1 ? (
                  <>
                    {title.split('Questions')[0]}
                    <span className="theme-cl">Questions</span>
                  </>
                ) : (
                  title
                )}
              </h2>
            </div>

            <div className="accordion" role="tablist">
              {faqs.map((faq, index) => (
                <div key={index} className="card mb-2">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="card-header bg-white shadow-sm border-0 w-full text-left"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-content-${index}`}
                    id={`faq-header-${index}`}
                    type="button"
                  >
                    <h6 className="mb-0 accordion_title d-flex justify-content-between align-items-center">
                      <span className="text-dark py-2">{faq.question}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </h6>
                  </button>
                  
                  {openIndex === index && (
                    <div
                      className="card-body pl-3 pr-3 pt-3"
                      id={`faq-content-${index}`}
                      role="region"
                      aria-labelledby={`faq-header-${index}`}
                    >
                      {typeof faq.answer === 'string' ? (
                        <p>{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Image */}
          {showImage && (
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="lmp_thumb">
                <Image
                  src={image}
                  className="img-fluid"
                  alt="FAQ illustration"
                  loading="lazy"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}