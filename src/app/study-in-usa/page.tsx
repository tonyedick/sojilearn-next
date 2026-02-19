import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  USANews,
  BannerStudyInUSA,
  CTAUSA,
  ExploreUSA,
  PartTimeCareersUSA,
  RequirementsUSA,
  StudyInUSAFull,
  PostUniUSA,
  FAQUSA
} from '@/components/USA';

export const metadata: Metadata = {
  title: "Study in USA - Top USA Universities | Sojilearn Study Abroad Consultants",
  description: "Study in the USA with Sojilearn. Get expert guidance on USA university admissions, student visa assistance, scholarships, and accommodation. Apply to top USA universities today!",
  keywords: 'study in USA, USA universities, study abroad USA, USA student visa, British universities, university admission USA, study in England, USA education consultants, London universities, Russell Group universities, USA Masters degree, USA undergraduate programs, student visa USA, IELTS for USA, study in Scotland, study in Wales',
  openGraph: {
    title: "Study in USA - Top USA Universities | Sojilearn",
    description: "Expert guidance for studying in the United States. Get help with USA university applications, student visa, scholarships and find the perfect USA university for you.",
    url: "https://www.sojilearn.com/study-in-usa",
    images: [
      {
        url: "https://www.sojilearn.com/social-media.jpg",
        width: 1200,
        height: 630,
        alt: "Study in USA - Sojilearn Study Abroad Consultancy for USA Universities",
      }
    ],
    siteName: "Sojilearn",
    type: "website",
    locale: "en_US",
  },
};

export default function StudyInUSA() {
  useAnalytics();
  return (
    <AppLayout>
     <>
        <BannerStudyInUSA />
        <ExploreUSA />
        <StudyInUSAFull />
        <RequirementsUSA />
        <PostUniUSA />
        <PartTimeCareersUSA />
        <USANews />
        <FAQUSA />
        <CTAUSA />
     </>
    </AppLayout>
  );
}