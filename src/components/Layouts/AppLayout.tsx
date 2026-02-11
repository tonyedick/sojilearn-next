'use client';

import Footer from "../Footer";
import { Toaster } from "react-hot-toast";
import Header from "../Header";
import { JSX } from "react";

type PageProps = {
  children: JSX.Element;
};

const AppLayout = ({ children }: PageProps) => {
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