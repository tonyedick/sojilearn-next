import { Metadata } from "next";
import Content from '@/components/AboutContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "About Us - Sojilearn",
  description: "Sojilearn is a study abroad agency, helping students navigate their educational journey and achieve their dreams.",
  openGraph: {
    title: "About Us - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/about",
    images: [{ url: "https://www.sojilearn.com/logo.png" }],
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
