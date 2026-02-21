import FAQSection from '@/components/shared/FAQSection';
import { FAQItem } from '@/lib/types/common';

const ukFAQs: FAQItem[] = [
  {
    question: "How much does it cost to study in the UK?",
    answer: "The fees for courses vary across different universities in the UK. The average cost of UG courses in UK range from £9,000-30,000. The fees for PG courses is around £15,000-35,000. MBA courses in UK cost around £12,000-80,000."
  },
  {
    question: "Is it possible to study in the UK without IELTS?",
    answer: "Yes, it is possible for you to study in UK without IELTS! The alternatives to IELTS might include online interviews held by the university or a major in English, and high school certification. These might not be applicable for all universities but certain universities do offer this provision. Some of the universities that provide this route include the University of East Anglia, University of Bristol, London Southbank University, Brunel University among others."
  },
  {
    question: "Can one work part-time while studying in the UK?",
    answer: "Yes, international students who have enrolled for a full-time course are allowed to work for 20 hours a week during their stay. For students enrolled in a language course, the time is reduced to 10 hours in a week. However, there is no time limit on working hours during vacations."
  },
  {
    question: "What is the minimum percentage required to study in the UK?",
    answer: "The minimum required score differs across each university. However, most of the universities prefer candidates with at least 60% at the UG level and 70-75% at the PG level."
  },
  {
    question: "What are the best courses in the UK?",
    answer: (
      <>
        <p>The most popular courses for international students to study in UK are:</p>
        <ol>
          <li>Natural Sciences</li>
          <li>Medicine</li>
          <li>Social Sciences</li>
          <li>Business</li>
          <li>Law</li>
          <li>Engineering and Technology</li>
          <li>Arts</li>
          <li>Media and Communication</li>
        </ol>
      </>
    )
  },
  {
    question: "Which are the top universities in the UK?",
    answer: (
      <>
        <p>The following are the top universities in the UK ranked based on academic reputation, employability and research impact.</p>
        <ul>
          <li>University of Cambridge</li>
          <li>The University of Oxford</li>
          <li>London School of Economics and Political Science</li>
          <li>University of Bath</li>
          <li>University of East Anglia</li>
          <li>University of St Andrews</li>
          <li>King&apos;s College London</li>
          <li>University of Birmingham</li>
          <li>Queen Mary University of London</li>
          <li>University of York</li>
        </ul>
      </>
    )
  },
  {
    question: "How long can one stay after studying in the UK?",
    answer: "According to the new law, students will now have the opportunity of obtaining a two-year work permit upon the completion of their degree thus opening up avenues for permanent settlement in the country. There are immense prospects for a lucrative career after you study in UK. So, it is important that you engage effectively with your course and stay on the lookout for good career opportunities!"
  }
];

export default function FAQUK() {
  return <FAQSection faqs={ukFAQs} />;
}