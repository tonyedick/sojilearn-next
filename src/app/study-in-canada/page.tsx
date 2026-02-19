import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  CANews,
  BannerStudyInCanada,
  CTACA,
  ExploreCanada,
  PartTimeCareersCA,
  RequirementsCA,
  StudyInCAFull,
  PostUniCA
} from '@/components/CA';

export const metadata: Metadata = {
  title: "Study in Canada - Canadian Universities | Sojilearn Study Abroad Consultants",
  description: "Study in Canada with Sojilearn. Expert guidance on Canadian university admissions, student visa, PGWP, scholarships, and pathways to PR. Apply to top Canadian universities now!",
  keywords: 'study in Canada, Canadian universities, study abroad Canada, Canada student visa, study permit Canada, university admission Canada, colleges in Canada, Canadian education, Toronto universities, Vancouver universities, Canada Masters degree, Canada undergraduate programs, PGWP Canada, Canada PR pathway, study in Ontario, study in British Columbia, Canadian scholarships, IELTS for Canada',
  openGraph: {
    title: "Study in Canada - Top Canadian Universities | Sojilearn",
    description: "Expert guidance for studying in Canada. Get help with Canadian university applications, study permit, PGWP, and permanent residency pathways. Start your Canadian education journey today!",
    url: "https://www.sojilearn.com/study-in-canada",
    images: [
      {
        url: "https://www.sojilearn.com/social-media.jpg",
        width: 1200,
        height: 630,
        alt: "Study in Canada - Sojilearn Study Abroad Consultancy for Canadian Universities",
      }
    ],
    siteName: "Sojilearn",
    type: "website",
    locale: "en_US",
  },
};

export default function StudyInCA() {
  useAnalytics();
  return (
    <AppLayout>
     <>
        <BannerStudyInCanada />
        <ExploreCanada />
        <StudyInCAFull />
        <RequirementsCA />
        <PartTimeCareersCA />
        <PostUniCA />
        <CANews />
        <CTACA />
     </>
    </AppLayout>
  );
}