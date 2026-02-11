import { Metadata } from "next";
import Hero from '@/components/Banner';
import Explore from '@/components/Explore';
import Steps from '@/components/Steps';
import WhySoji from "@/components/WhySoji";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import SimplifyAdmit from "@/components/SimplifyAdmit";
import AppLayout from "@/components/Layouts/AppLayout";
import StudyInUkCom from "@/components/UK/StudyInUkCom";
import StudyInCanada from "@/components/CA/StudyInCanada";
import NewsServer from '@/components/NewsServer';

export const metadata: Metadata = {
  title: "Sojilearn - Study Abroad Consultants | UK, Finland, USA, Canada, Germany & Malta Universities",
  description: "Expert study abroad consultancy with 98% success rate. Fast university admissions, visa assistance, and student loans for UK, USA, & Canada Malta. Free consultation available.",
  keywords: 'study abroad consultants, international education agency, UK university admission, study in Finland, USA, Canada student visa, Germany universities, Malta education, overseas education consultants, study abroad agency Nigeria, student visa assistance, university application help, international student services, study abroad scholarship, education loan for students, IELTS waiver admission, postgraduate studies abroad, undergraduate admission abroad, MBA abroad, masters degree UK, student accommodation abroad',
  openGraph: {
    title: "Sojilearn - Your Trusted Study Abroad Partner | 98% Success Rate",
    description: "Fast-track your admission to top universities in UK, Finland, USA, Canada, Germany & Malta. Expert counselors, stress-free process, visa support & student loans. Start your journey today!",
    url: "https://www.sojilearn.com",
    images: [
      {
        url: "https://www.sojilearn.com/social-media.jpg",
        width: 1200,
        height: 630,
        alt: "Sojilearn Study Abroad Consultancy - Helping Students Study in UK, Finland, Canada, Germany and Malta",
      }
    ],
    siteName: "Sojilearn",
    type: "website",
    locale: "en_US",
  },

    twitter: {
      card: "summary_large_image",
      title: "Sojilearn - Study Abroad Made Simple",
      description: "Fast university admissions | Expert visa support | 98% success rate | UK, Finland, USA, Canada, Germany & Malta",
      images: ["https://www.sojilearn.com/social-media.jpg"],
      creator: "@sojilearn",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: "https://www.sojilearn.com",
    },

    authors: [{ name: "Sojilearn Optimum Solutions Ltd" }],
  
    category: "Education",

    other: {
      'geo.region': 'NG',
      'geo.placename': 'Nigeria',
      'contact': 'info@sojilearn.com',
      'coverage': 'Worldwide',
      'distribution': 'Global',
      'rating': 'General',
      'revisit-after': '7 days',
    },
};

export default function Home() {
  return (
    <AppLayout>
     <>
      <Hero />
      <Explore />
      <Steps />
      <StudyInUkCom />
      <SimplifyAdmit />
      <StudyInCanada />
      <WhySoji />
      <NewsServer />
      <FAQ />
      <CTA />
     </>
    </AppLayout>
  );
}
