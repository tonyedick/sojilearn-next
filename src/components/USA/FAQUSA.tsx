
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from 'lucide-react';
import faq from "../../assets/img/side-1.png";

export default function FAQUSA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I study in USA for free?",
      answer: "There are various private and government scholarships available for studying in USA that offer 100% coverage of their major expenses like tuition fees, accommodation, health insurance, etc."
    },
    {
      question: "What exams are required to study in USA?",
      answer: "Qualifying entrance level exams are necessary when it comes to fulfilling your dream of studying abroad. For those who are willing to study in the USA, it will be mandatory for you to qualify for IELTS, TOEFL along with subject/ program related exams like SAT/ACT or GMAT/GRE."
    },
    {
      question: "How much will it cost to study in USA?",
      answer: "The average cost to study in USA will totally depend on the program as well as the living standards you opt for. If you are about to pursue UG courses, your average tuition fee will be around $ 21, 405 - 27, 658. On the other hand, seeking a PG degree in the country will cost you around $ 31, 266."
    },
    {
      question: "Is IELTS required for USA?",
      answer: "Yes, IELTS is one of the most prominent requirements when it comes to studying in USA. But, there are a few universities that allow admissions without undertaking the score of IELTS."
    },
    {
      question: "Which is the best university to study in USA?",
      answer: (
        <>
          <p>The following are the top universities in the USA ranked based on the academic standards and research impact.</p>
          <ol>
            <li>Stanford University</li>
            <li>Harvard University</li>
            <li>California Institute of Technology (Caltech)</li>
            <li>Massachusetts Institute of Technology</li>
            <li>University of California, Berkeley</li>
            <li>Yale University</li>
            <li>University of California Los Angeles</li>
            <li>Princeton University</li>
            <li>University of Chicago</li>
            <li>Johns Hopkins University</li>
            <li>University of Pennsylvania</li>
          </ol>
        </>
      )
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="gray">
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="sec-heading center">
              <h2>Frequently Asked <span className="theme-cl">Questions</span></h2>
            </div>
            <div className="accordion">
              {faqs.map((faq, index) => (
                <div key={index} className="card mb-2">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="card-header bg-white shadow-sm border-0 w-full text-left"
                    aria-expanded={openIndex === index}
                  >
                    <h6 className="mb-0 accordion_title d-flex justify-content-between align-items-center">
                      <span className="text-dark py-2">{faq.question}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </h6>
                  </button>
                  {openIndex === index && (
                    <div className="card-body pl-3 pr-3 pt-3">
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
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="lmp_thumb">
              <Image src={faq} className="img-fluid" alt="USA FAQ" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
