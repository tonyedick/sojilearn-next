'use client';

import Footer from "./Footer";
import BlogHeader from "./BlogHeader";
import { JSX } from 'react';
import { Toaster } from "react-hot-toast";

type PageProps = {
  children: JSX.Element;
};

const BlogLayout = ({ children }: PageProps) => {
  
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