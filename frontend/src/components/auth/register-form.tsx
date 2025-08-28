"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "react-hot-toast";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success(
        `Welcome ${data.firstName}! Your account has been created successfully.`
      );
      router.push("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";

      // Show specific error messages based on the error
      if (
        errorMessage.includes("email already exists") ||
        errorMessage.includes("409") ||
        errorMessage.includes("Email already in use") ||
        errorMessage.includes("email already in use")
      ) {
        toast.error(
          "An account with this email already exists. Please use a different email or try logging in."
        );
      } else if (
        errorMessage.includes("Invalid email") ||
        errorMessage.includes("email")
      ) {
        toast.error("Please enter a valid email address.");
      } else if (
        errorMessage.includes("password") &&
        errorMessage.includes("8")
      ) {
        toast.error("Password must be at least 8 characters long.");
      } else if (
        errorMessage.includes("First name") ||
        errorMessage.includes("firstName")
      ) {
        toast.error("Please enter your first name.");
      } else if (
        errorMessage.includes("Last name") ||
        errorMessage.includes("lastName")
      ) {
        toast.error("Please enter your last name.");
      } else if (
        errorMessage.includes("network") ||
        errorMessage.includes("fetch")
      ) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else if (errorMessage.includes("Validation failed")) {
        toast.error("Please check your input and try again.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            <span>Creating Account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
