"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuthStore } from "@/stores/authStore";
import { motion } from "framer-motion";
import { Sparkles, LogOut, User, Home } from "lucide-react";

export function Header() {
  const { isAuthenticated, logout, user } = useAuthStore();

  const handleBrandClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      window.location.href = "/dashboard";
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div
          onClick={handleBrandClick}
          className={`flex items-center space-x-3 group ${isAuthenticated ? "cursor-pointer" : ""}`}
        >
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CalorieTracker
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Smart Nutrition Tracking
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-all duration-200"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>

              {user && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.firstName || user.email?.split("@")[0] || "User"}
                  </span>
                </div>
              )}

              <Button
                variant="outline"
                onClick={logout}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
