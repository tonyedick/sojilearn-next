import { Metadata } from "next";
import Content from '@/components/DisclaimerContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "Disclaimer - Sojilearn",
  description: "Disclaimer for Sojilearn regarding the accuracy and use of information on the website.",
  openGraph: {
    title: "Disclaimer - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/disclaimer",
    images: [{ url: "https://www.sojilearn.com/social-media.jpg" }],
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
