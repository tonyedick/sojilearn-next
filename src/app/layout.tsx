import type { Metadata } from "next";
import { Jost, Mulish } from "next/font/google";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import "./plugins.css";
// import "../assets/css/plugins/animation.css";
// import "../assets/css/plugins/bootstrap.min.css";
// import "../assets/css/plugins/date-picker.css";
// import "../assets/css/plugins/select2.css";
// import "../assets/css/plugins/slick.css";
// import "../assets/css/plugins/slick-theme.css";
// import "../assets/css/plugins/themify.css";
// import "../assets/css/plugins/morris.css";
// import "../assets/css/plugins/font-awesome.css";
// import "../assets/css/plugins/flaticon.css";
// import "../assets/css/plugins/summernote.min.css";

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
