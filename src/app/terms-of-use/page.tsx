import { Metadata } from "next";
import Content from '@/components/TCContent';
import AppLayout from "@/components/Layouts/AppLayout";
import { useAnalytics } from '@/hooks/useAnalytics';

export const metadata: Metadata = {
  title: "Terms of Use - Sojilearn",
  description: "Read the terms of use for Sojilearn's website. Understand your rights and responsibilities when using our services.",
  openGraph: {
    title: "Terms of Use - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/terms-of-use",
    images: [{ url: "https://www.sojilearn.com/social-media.jpg" }],
  },
};

export default function TermsOfUse() {
  useAnalytics();
  
  return (
    <AppLayout>
     <>
      <Content />
     </>
    </AppLayout>
  );
}
