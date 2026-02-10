import { Metadata } from "next";
import Content from '@/components/TCContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "Terms of Use - Sojilearn",
  description: "Sojilearn helps students navigate their educational journey with expert guidance for studying in UK, USA, Canada, Germany, and Malta",
  openGraph: {
    title: "Terms of Use - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/terms-of-use",
    images: [{ url: "https://www.sojilearn.com/logo.png" }],
  },
};

export default function TermsOfUse() {
  return (
    <AppLayout>
     <>
      <Content />
     </>
    </AppLayout>
  );
}
