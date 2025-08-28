"use client";

import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function Toaster() {
  // Simplified toaster that doesn't depend on UIStore
  // This will be replaced with react-hot-toast in the future
  return null;
}
