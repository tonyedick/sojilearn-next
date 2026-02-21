import FAQSection from '@/components/shared/FAQSection';
import { FAQItem } from '@/lib/types';

const maltaFAQs: FAQItem[] = [
  {
    question: "How much does it cost to study in Malta?",
    answer: "The fees for courses vary across different universities in Malta. Cost of Foundational Courses is €5,000. The average cost of UG courses in Malta ranges from €6,000 - €7,000. The fees for PG courses is around €7,000 - €10,000. MBA courses in Malta cost around €10,000."
  },
  {
    question: "Is it possible to study in Malta without IELTS?",
    answer: "Yes, it is possible for you to study in Malta without IELTS! The alternatives to IELTS might include online interviews held by the university or a major in English, and high school certification. For schools that require English proficiency, IELTS 6.0 and Duolingo 105 is required."
  },
  {
    question: "Can one work part-time while studying in Malta?",
    answer: "Yes, international students who have enrolled for a full-time course are allowed to work for 20 hours a week during their stay. However, there is no time limit on working hours during vacations."
  },
  {
    question: "What is the minimum percentage required to study in Malta?",
    answer: "For a course like BA (Hons) Business and Management, A-level grades are required. However, most of the universities prefer candidates with at least 60% at the UG level and 70-75% at the PG level."
  },
  {
    question: "What are the best courses in Malta?",
    answer: (
      <>
        <p>The most popular courses for international students to study in Malta are:</p>
        <ol>
          <li>MBA</li>
          <li>Marketing and Brand Management</li>
          <li>Business and Management</li>
          <li>Computer Science and Information Technology</li>
          <li>MQF Level 4 (UK Level 3)</li>
        </ol>
      </>
    )
  },
  {
    question: "Which are the top universities in Malta and its affiliates?",
    answer: (
      <>
        <p>The following are the top universities in Malta ranked based on academic reputation, employability and research impact.</p>
        <ul>
          <li>GBS Malta</li>
          <li>Schiller International University, USA</li>
          <li>MLA College, UK</li>
          <li>École de Management Appliqué, Paris</li>
          <li>GBS Dubai</li>
        </ul>
      </>
    )
  },
  {
    question: "How long can one stay after studying in Malta?",
    answer: "Students have the opportunity of obtaining a 1-year work permit upon the completion of their degree thus opening up avenues for permanent settlement in the country. Malta is in the Schengen Area, allowing travel to 28+ EU countries. It's a growing destination for African, Asian, and Middle Eastern students due to its affordability, visa friendliness, and English-speaking environment."
  }
];

export default function FAQMalta() {
  return <FAQSection faqs={maltaFAQs} />;
}