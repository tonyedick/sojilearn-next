import { Metadata } from "next";
import Content from '@/components/DisclaimerContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "Disclaimer - Sojilearn",
  description: "Sojilearn helps students navigate their educational journey with expert guidance for studying in UK, USA, Canada, Germany, and Malta",
  openGraph: {
    title: "Disclaimer - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/disclaimer",
    images: [{ url: "https://www.sojilearn.com/logo.png" }],
  },
};

export default function Disclaimer() {
  return (
    <AppLayout>
     <>
      <Content />
     </>
    </AppLayout>
  );
}
