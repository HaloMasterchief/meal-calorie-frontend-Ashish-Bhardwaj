"use client";

import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthLayout } from "@/components/layout/auth-layout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePublicGuard } from "@/hooks/useAuthGuard";

export default function RegisterPage() {
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
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start tracking your calories today."
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
