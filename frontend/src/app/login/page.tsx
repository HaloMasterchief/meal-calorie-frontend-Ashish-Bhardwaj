"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/layout/auth-layout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePublicGuard } from "@/hooks/useAuthGuard";

export default function LoginPage() {
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
      title="Sign In"
      subtitle="Welcome back! Please sign in to your account."
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Sign up"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
