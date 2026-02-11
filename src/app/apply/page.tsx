import { Metadata } from "next";
import Content from '@/components/ApplyContent';
import AppLayout from "@/components/Layouts/AppLayout";

export const metadata: Metadata = {
  title: "Online application - Sojilearn",
  description: "Sojilearn is a study abroad agency, helping students navigate their educational journey and achieve their dreams.",
  openGraph: {
    title: "Online application - Sojilearn",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com/apply",
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
