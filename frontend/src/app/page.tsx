"use client";

import { Suspense } from "react";
import { usePublicGuard } from "@/hooks/useAuthGuard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CTASection } from "@/components/sections/cta-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  const { isAuthenticated } = usePublicGuard();

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <HowItWorksSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
