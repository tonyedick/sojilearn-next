import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import {
  GYNews,
  BannerStudyInGermany,
  CTAGY,
  ExploreGermany,
  PartTimeCareersGY,
  RequirementsGY,
  StudyInGYFull,
  PostUniGY,
  FAQGY
} from '@/components/GY';

export const metadata: Metadata = {
  title: "Study in Germany - Top Germany Universities | Sojilearn Study Abroad Consultants",
  description: "Study in Germany with Sojilearn. Get expert guidance on Germany university admissions, student visa assistance, scholarships, and accommodation. Apply to top Germany universities today!",
  keywords: 'study in Germany, Germany universities, study abroad Germany, Germany student visa, German universities, university admission Germany, study in Germany, Germany education consultants, Berlin universities, Munich universities, Germany Masters degree, Germany undergraduate programs, student visa Germany, IELTS for Germany, study in Germany, study in Germany',
  openGraph: {
    title: "Study in Germany - Top Germany Universities | Sojilearn",
    description: "Expert guidance for studying in Germany. Get help with Germany university applications, student visa, scholarships and find the perfect Germany university for you.",
    url: "https://www.sojilearn.com/study-in-germany",
    images: [
      {
        url: "https://www.sojilearn.com/social-media.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Germany - Sojilearn Study Abroad Consultancy for Germany Universities",
      }
    ],
    siteName: "Sojilearn",
    type: "website",
    locale: "en_US",
  },
};

export default function StudyInGermany() {
  return (
    <AppLayout>
     <>
        <BannerStudyInGermany />
        <ExploreGermany />
        <StudyInGYFull />
        <RequirementsGY />
        <PostUniGY />
        <PartTimeCareersGY />
        <GYNews />
        <FAQGY />
        <CTAGY />
     </>
    </AppLayout>
  );
}