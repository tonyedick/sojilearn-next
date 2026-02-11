'use client';

import Footer from "../Footer";
import Header from "../Header";
import { JSX } from "react";

type PageProps = {
  children: JSX.Element;
};

const AppLayout = ({ children }: PageProps) => {
  return (
    <>  
      <Header />
        <main id="main-content" role="main">
          {children}
        </main>
      <Footer />
    </>
  );
};

export default AppLayout;