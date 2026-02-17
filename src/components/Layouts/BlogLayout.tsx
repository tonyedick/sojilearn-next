import Footer from "./Footer";
import BlogHeader from "./BlogHeader";
import { JSX } from 'react';

type PageProps = {
  children: JSX.Element;
};

const BlogLayout = ({ children }: PageProps) => {
  return (
    <>  
      <BlogHeader />
      {children}
      <Footer />
    </>
  );
};

export default BlogLayout;