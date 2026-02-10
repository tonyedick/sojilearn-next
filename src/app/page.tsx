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
  title: "Sojilearn - Study Abroad Agency | UK, USA, Canada, Germany, Malta",
  description: "Sojilearn helps students navigate their educational journey with expert guidance for studying in UK, USA, Canada, Germany, and Malta",
  openGraph: {
    title: "Sojilearn - Study Abroad Agency",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com",
    images: [{ url: "https://www.sojilearn.com/logo.png" }],
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
