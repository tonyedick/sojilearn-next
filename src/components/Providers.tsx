'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FloatingWhatsApp } from 'react-floating-whatsapp';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const phoneNumber = '+2348137806643'; 
  const accountName = 'Sojilearn - Study in Malta | UK | USA | Canada | Germany | Ireland';
  const avatar = '/assets/img/favicon.png';
  const statusMessage = "We're online";

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <FloatingWhatsApp
        phoneNumber={phoneNumber}
        accountName={accountName}
        avatar={avatar}
        statusMessage={statusMessage}
      />
      {children}
    </QueryClientProvider>
  );
}