import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Meal Calorie Count Generator",
  description:
    "Track your meals and calculate calories. View your nutrition history and analytics.",
  keywords: [
    "calorie tracker",
    "meal tracking",
    "nutrition dashboard",
    "calorie calculator",
    "food diary",
    "health tracking",
    "diet management",
    "nutrition analytics",
  ],
  openGraph: {
    title: "Nutrition Dashboard - CalorieTracker",
    description:
      "Track your meals and calculate calories with precision. View your nutrition history and analytics.",
    type: "website",
    url: "https://yourdomain.com/dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
