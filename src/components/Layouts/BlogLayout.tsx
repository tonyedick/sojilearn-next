'use client';

import Footer from "./Footer";
import BlogHeader from "./BlogHeader";
import { JSX } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Toaster } from "react-hot-toast";

type PageProps = {
  children: JSX.Element;
};

const BlogLayout = ({ children }: PageProps) => {
  // Track page views automatically for all blog pages using this layout
  useAnalytics();
  
  return (
    <>  
      <Toaster/>
      <BlogHeader />
      {children}
      <Footer />
    </>
  );
};

export default BlogLayout;