import { Metadata } from "next";
import Content from '@/components/ApplyContent';
import AppLayout from "@/components/Layouts/AppLayout";
import ogImage from '../../assets/img/social-media.jpg';

export const metadata: Metadata = {
  title: "Online application - Sojilearn",
  description: "Sojilearn is a study abroad agency, helping students navigate their educational journey and achieve their dreams.",
  keywords: 'study abroad consultants, international education agency, UK university admission, study in Finland, USA, Canada student visa, Germany universities, Malta education, overseas education consultants, study abroad agency Nigeria, student visa assistance, university application help, international student services, study abroad scholarship, education loan for students, IELTS waiver admission, postgraduate studies abroad, undergraduate admission abroad, MBA abroad, masters degree UK, student accommodation abroad',
    openGraph: {
      title: "Online Application - Sojilearn | Your Trusted Study Abroad Partner | 98% Success Rate",
      description: "Fast-track your admission to top universities in UK, Finland, USA, Canada, Germany & Malta. Expert counselors, stress-free process, visa support & student loans. Start your journey today!",
      url: "https://www.sojilearn.com/apply",
      images: [
        {
          url: ogImage.src,
          width: 1200,
          height: 630,
          alt: "Sojilearn Study Abroad Consultancy - Helping Students Study in UK, Finland, Canada, Germany and Malta",
        }
      ],
      siteName: "Sojilearn",
      type: "website",
      locale: "en_US",
    },
};

export default function About() {
  return (
    <AppLayout>
     <>
      <Content />
     </>
    </AppLayout>
  );
}
