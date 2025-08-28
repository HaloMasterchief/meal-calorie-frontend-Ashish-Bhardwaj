import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// API utilities
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle specific error cases with user-friendly messages
      if (response.status === 500 && endpoint === "/get-calories") {
        throw new Error(
          "Dish not found. Please try a different dish name or check the spelling."
        );
      }

      if (response.status === 404 && endpoint === "/get-calories") {
        throw new Error(
          "Dish not found. Please try a different dish name or check the spelling."
        );
      }

      if (response.status === 400) {
        // Handle validation errors
        if (errorData.error?.includes("Email already in use")) {
          throw new Error(
            "An account with this email already exists. Please use a different email or try logging in."
          );
        }
        if (errorData.message?.includes("email")) {
          throw new Error("Please enter a valid email address.");
        }
        if (errorData.message?.includes("password")) {
          throw new Error("Password must be at least 8 characters long.");
        }
        if (errorData.message?.includes("servings")) {
          throw new Error("Servings must be at least 0.1.");
        }
        if (errorData.message?.includes("dish_name")) {
          throw new Error("Please enter a valid dish name.");
        }
        throw new Error(
          errorData.message ||
            errorData.error ||
            "Invalid input. Please check your data."
        );
      }

      if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      if (response.status === 403) {
        throw new Error(
          "Access denied. You don't have permission to perform this action."
        );
      }

      if (response.status === 404) {
        throw new Error(
          "Resource not found. Please check the URL and try again."
        );
      }

      if (response.status === 409) {
        // Handle conflict errors (e.g., email already exists)
        if (
          endpoint === "/auth/register" &&
          errorData.message?.includes("email")
        ) {
          throw new Error(
            "An account with this email already exists. Please use a different email or try logging in."
          );
        }
        throw new Error(
          errorData.message || "Conflict occurred. Please try again."
        );
      }

      if (response.status === 422) {
        // Handle validation errors from server
        if (errorData.errors) {
          const firstError = Object.values(errorData.errors)[0];
          throw new Error(
            Array.isArray(firstError) ? firstError[0] : firstError
          );
        }
        throw new Error(
          errorData.message || "Validation failed. Please check your input."
        );
      }

      if (response.status === 429) {
        throw new Error(
          "Too many requests. Please wait a moment and try again."
        );
      }

      // Generic error handling
      const errorMessage =
        errorData.message ||
        errorData.error ||
        `Request failed with status ${response.status}`;

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Date utilities
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(date);
}

// Number utilities
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatCalories(calories: number): string {
  return `${formatNumber(Math.round(calories))} cal`;
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

// String utilities
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Color utilities
export function getCalorieColor(calories: number): string {
  if (calories < 200) return "text-green-600";
  if (calories < 400) return "text-yellow-600";
  if (calories < 600) return "text-orange-600";
  return "text-red-600";
}

export function getCalorieBgColor(calories: number): string {
  if (calories < 200) return "bg-green-100 dark:bg-green-900/20";
  if (calories < 400) return "bg-yellow-100 dark:bg-yellow-900/20";
  if (calories < 600) return "bg-orange-100 dark:bg-orange-900/20";
  return "bg-red-100 dark:bg-red-900/20";
}

// Array utilities
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

// Object utilities
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

// Error handling utilities
export function isApiError(error: unknown): error is { message: string } {
  return (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}

// Animation utilities
export function getAnimationDelay(
  index: number,
  baseDelay: number = 100
): string {
  return `${index * baseDelay}ms`;
}

// Responsive utilities
export function getResponsiveValue<T>(
  mobile: T,
  tablet: T,
  desktop: T
): { mobile: T; tablet: T; desktop: T } {
  return { mobile, tablet, desktop };
}

// SEO utilities
export function generateMetaTitle(title: string): string {
  const appName =
    process.env.NEXT_PUBLIC_APP_NAME || "Meal Calorie Count Generator";
  return `${title} | ${appName}`;
}

export function generateMetaDescription(description: string): string {
  return description.length > 160
    ? `${description.slice(0, 157)}...`
    : description;
}
