import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget, PromoPopup } from "@/features/marketing";
import { PageLoadingSpinner, ScrollToTop, ToastContainer } from "@/shared/components";

export const RootLayout: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wardity-bg dark:bg-wardity-bg-dark">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
      <PromoPopup />
      <ToastContainer />
    </div>
  );
};
