import { Metadata } from "next";
import Content from '@/components/PrivacyContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "Privacy Policy - Sojilearn",
  description: "Sojilearn helps students navigate their educational journey with expert guidance for studying in UK, USA, Canada, Germany, and Malta",
  openGraph: {
    title: "Privacy Policy - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/privacy-policy",
    images: [{ url: "https://www.sojilearn.com/logo.png" }],
  },
};

export default function PrivacyPolicy() {
  return (
    <AppLayout>
     <>
      <Content />
     </>
    </AppLayout>
  );
}
