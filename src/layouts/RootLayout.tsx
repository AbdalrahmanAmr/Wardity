import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@/components/layout";
import { ChatWidget } from "@/components/features";
import { PageLoadingSpinner, ScrollToTop } from "@/components/ui";
import { useDarkMode } from "@/hooks/useDarkMode";

export const RootLayout: FC = () => {
  // Initialize dark mode on mount
  useDarkMode();

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
    </div>
  );
};
