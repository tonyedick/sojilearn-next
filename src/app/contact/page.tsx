import { Metadata } from "next";
import Content from '@/components/ContactContent';
import AppLayout from "@/components/Layouts/AppLayout";
import { useAnalytics } from '@/hooks/useAnalytics';

export const metadata: Metadata = {
  title: "Contact Us - Sojilearn",
  description: "Sojilearn is a study abroad agency, helping students navigate their educational journey and achieve their dreams.",
  openGraph: {
    title: "Contact Us - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/contact",
    images: [{ url: "https://www.sojilearn.com/social-media.jpg" }],
  },
};

export default function Contact() {
    useAnalytics();
  return (
    <AppLayout>
     <>
      <Content />
     </>
    </AppLayout>
  );
}
