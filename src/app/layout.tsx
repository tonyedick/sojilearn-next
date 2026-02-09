import type { Metadata } from "next";
import { Jost, Mulish } from "next/font/google";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import "./plugins.css";

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jost',
});

const mulish = Mulish({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-mulish',
});

export const metadata: Metadata = {
  title: "Sojilearn - Study Abroad Agency",
  description: "Sojilearn helps students navigate their education abroad journey",
  keywords: "study abroad, international education, student services, UK universities, Canada universities, Finnish universities, university applications, visa assistance, scholarship guidance, global learning, cultural exchange, education consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>
      <body className={`${jost.variable} ${mulish.variable}`}>
        <Providers>
          <ScrollToTop />
          {children}
        </Providers>
      </body>
    </html>
  );
}
