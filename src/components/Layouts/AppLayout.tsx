'use client';

import Footer from "./Footer";
import Header from "./Header";
import { JSX } from "react";
import { Toaster } from "react-hot-toast";
import { useAnalytics } from '@/hooks/useAnalytics';

type PageProps = {
  children: JSX.Element;
};

const AppLayout = ({ children }: PageProps) => {
  // Track page views automatically for all pages using this layout
  useAnalytics();
  
  return (
    <>  
      <Toaster/>
      <Header />
        <main id="main-content" role="main">
          {children}
        </main>
      <Footer />
    </>
  );
};

export default AppLayout;