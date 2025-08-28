import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Meal Calorie Count Generator",
  description:
    "Sign in to your account to track your meals and calculate calories.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
