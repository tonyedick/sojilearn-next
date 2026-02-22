'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

export default function FAQ() {

  const faqs = [
    {
      question: "How much does it cost to process admission for a student?",
      answer: "Sojilearn charges a one-time fee of $199 to process undergraduate or post graduate admission in USA and Canada, while for the UK, Germany, Malta, Ireland, we charge a one-time fee of $70."
    },
    {
      question: "Can I have multiple applications at the same time?",
      answer: "Yes, when we submit your application, we apply to multiple universities for you."
    },
    {
      question: "How can I track my applications?",
      answer: "For smooth communication, our team will keep you updated on the status of your applications via email and WhatsApp."
    },
    {
      question: "Are there benefits for referring students to Sojilearn?",
      answer: "Yes, when you refer a student to Sojilearn, you stand a chance to earn from $150 to $300."
    },
    {
      question: "What are the countries you process admission for?",
      answer: "Currently, our partner universities are in Malta, UK, Germany, USA, Canada and Ireland."
    }
  ];

  const handleFAQClick = (question: string) => {
    trackButtonClick(
      'faq_expand',
      'faq_section',
      `FAQ clicked: ${question.substring(0, 50)}`
    );
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-8">
            <div className="sec-heading center">
              <h2>There are no stupid questions, Ask Away, <span className="theme-cl">We are All Ears</span></h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12">
            <div className="accordion">
              {faqs.map((faq, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <div className="card mb-2">
                      <DisclosureButton className="card-header bg-white shadow-sm border-0 w-full" onClick={() => handleFAQClick(faq.question)}>
                        <h6 className="mb-0 accordion_title d-flex justify-content-between align-items-center">
                          <span className="text-dark py-2">{faq.question}</span>
                          <ChevronDownIcon
                            className={`w-5 h-5 transition-transform ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        </h6>
                      </DisclosureButton>
                      <DisclosurePanel className="card-body pl-3 pr-3 pt-3">
                        <p>{faq.answer}</p>
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}