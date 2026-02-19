import { Metadata } from "next";
import Content from '@/components/PrivacyContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "Privacy Policy - Sojilearn",
  description: "At Sojilearn, we are committed to protecting your privacy and personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.",
  openGraph: {
    title: "Privacy Policy - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/privacy-policy",
    images: [{ url: "https://www.sojilearn.com/social-media.jpg" }],
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
