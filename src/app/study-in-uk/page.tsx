import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import {
  UKNews,
  BannerStudyInUk,
  CTAUK,
  ExploreUK,
  PartTimeCareersUK,
  RequirementsUK,
  StudyInUkFull,
  PostUniUK,
  FAQUK
} from '@/components/UK';

export const metadata: Metadata = {
  title: "Study in UK - Top UK Universities | Sojilearn Study Abroad Consultants",
  description: "Study in the UK with Sojilearn. Get expert guidance on UK university admissions, student visa assistance, scholarships, and accommodation. Apply to top UK universities today!",
  keywords: 'study in UK, UK universities, study abroad UK, UK student visa, British universities, university admission UK, study in England, UK education consultants, London universities, Russell Group universities, UK Masters degree, UK undergraduate programs, student visa UK, IELTS for UK, study in Scotland, study in Wales',
  openGraph: {
    title: "Study in UK - Top UK Universities | Sojilearn",
    description: "Expert guidance for studying in the United Kingdom. Get help with UK university applications, student visa, scholarships and find the perfect UK university for you.",
    url: "https://www.sojilearn.com/study-in-uk",
    images: [
      {
        url: "https://www.sojilearn.com/social-media.jpg",
        width: 1200,
        height: 630,
        alt: "Study in UK - Sojilearn Study Abroad Consultancy for UK Universities",
      }
    ],
    siteName: "Sojilearn",
    type: "website",
    locale: "en_US",
  },
};

export default function StudyInUK() {
  return (
    <AppLayout>
     <>
        <BannerStudyInUk />
        <ExploreUK />
        <StudyInUkFull />
        <RequirementsUK />
        <PostUniUK />
        <PartTimeCareersUK />
        <UKNews />
        <CTAUK />
        <FAQUK />
     </>
    </AppLayout>
  );
}