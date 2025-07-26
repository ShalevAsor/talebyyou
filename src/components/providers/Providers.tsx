"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Bounce, ToastContainer } from "react-toastify";

import { queryClient } from "@/lib/reactQuery";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </QueryClientProvider>
  );
};
