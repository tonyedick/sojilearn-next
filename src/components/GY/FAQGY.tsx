'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from 'lucide-react';
import faq from "../../assets/img/side-1.png";

export default function FAQGY() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does it cost to study in Germany?",
      answer: "Most public universities in Germany offer tuition-free education for both domestic and international students. However, students are required to pay a semester contribution fee ranging from €150-€350, which covers administrative costs and student services. Private universities charge tuition fees ranging from €10,000-€20,000 per year."
    },
    {
      question: "Is it possible to study in Germany without IELTS?",
      answer: "Yes, it is possible to study in Germany without IELTS! Many universities accept alternative English proficiency tests like TOEFL, PTE, or Duolingo. Some universities also waive the English test requirement if you completed your previous education in English medium. Additionally, for German-taught programs, you'll need to provide proof of German language proficiency (TestDaF or DSH)."
    },
    {
      question: "Can I work part-time while studying in Germany?",
      answer: "Yes, international students in Germany are allowed to work for 120 full days or 240 half days per year. Students can work without restrictions during semester breaks. Working part-time is a great way to gain experience and support yourself financially while studying."
    },
    {
      question: "What is the minimum percentage required to study in Germany?",
      answer: "The minimum academic requirement varies by university and program. Generally, most universities prefer candidates with at least 60-70% in their previous degree for undergraduate programs and 70-75% for postgraduate programs. Some competitive programs, especially at top universities, may require higher grades."
    },
    {
      question: "What are the best courses to study in Germany?",
      answer: (
        <>
          <p>Germany is renowned for its excellence in various fields. The most popular courses for international students include:</p>
          <ol>
            <li>Engineering (Mechanical, Automotive, Electrical)</li>
            <li>Computer Science and IT</li>
            <li>Business Administration (MBA)</li>
            <li>Medicine</li>
            <li>Natural Sciences</li>
            <li>Economics</li>
            <li>Architecture</li>
            <li>Applied Sciences</li>
          </ol>
        </>
      )
    },
    {
      question: "Which are the top universities in Germany?",
      answer: (
        <>
          <p>Germany is home to many world-class universities. Here are some of the top institutions:</p>
          <ul>
            <li>Technical University of Munich (TUM)</li>
            <li>Ludwig Maximilian University of Munich</li>
            <li>Heidelberg University</li>
            <li>Humboldt University of Berlin</li>
            <li>RWTH Aachen University</li>
            <li>University of Freiburg</li>
            <li>Free University of Berlin</li>
            <li>Karlsruhe Institute of Technology</li>
            <li>University of Mannheim</li>
            <li>University of Bonn</li>
          </ul>
        </>
      )
    },
    {
      question: "Can I stay in Germany after completing my studies?",
      answer: "Yes! Germany offers excellent post-study work opportunities. After graduation, international students can apply for an 18-month residence permit (Job Seeker Visa) to find employment related to their field of study. Once you secure a job, you can transition to a work visa and eventually apply for permanent residency after meeting the requirements. Germany has a strong economy with high demand for skilled professionals, especially in engineering, IT, and healthcare sectors."
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
              <Image src={faq} className="img-fluid" alt="Germany FAQ" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}