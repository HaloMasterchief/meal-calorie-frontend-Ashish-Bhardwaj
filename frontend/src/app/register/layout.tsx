import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Meal Calorie Count Generator",
  description:
    "Create your account to start tracking your meals and calculating calories.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
