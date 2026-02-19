import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  MaltaNews,
  BannerStudyInMalta,
  CTAMalta,
  ExploreMalta,
  PartTimeCareersMalta,
  RequirementsMalta,
  StudyInMaltaFull,
  PostUniMalta,
  FAQMalta
} from '@/components/Malta';

export const metadata: Metadata = {
  title: "Study in Malta - Top Malta Universities | Sojilearn Study Abroad Consultants",
  description: "Study in the Malta with Sojilearn. Get expert guidance on Malta university admissions, student visa assistance, scholarships, and accommodation. Apply to top Malta universities today!",
  keywords: 'study in Malta, Malta universities, study abroad Malta, Malta student visa, British universities, university admission Malta, study in England, Malta education consultants, London universities, Russell Group universities, Malta Masters degree, Malta undergraduate programs, student visa Malta, IELTS for Malta, study in Scotland, study in Wales',
  openGraph: {
    title: "Study in Malta - Top Malta Universities | Sojilearn",
    description: "Expert guidance for studying in Malta. Get help with Malta university applications, student visa, scholarships and find the perfect Malta university for you.",
    url: "https://www.sojilearn.com/study-in-malta",
    images: [
      {
        url: "https://www.sojilearn.com/social-media.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Malta - Sojilearn Study Abroad Consultancy for Malta Universities",
      }
    ],
    siteName: "Sojilearn",
    type: "website",
    locale: "en_US",
  },
};

export default function StudyInMalta() {
  useAnalytics();
  return (
    <AppLayout>
     <>
        <BannerStudyInMalta />
        <ExploreMalta />
        <StudyInMaltaFull />
        <RequirementsMalta />
        <PostUniMalta />
        <PartTimeCareersMalta />
        <MaltaNews />
        <FAQMalta />
        <CTAMalta />
     </>
    </AppLayout>
  );
}