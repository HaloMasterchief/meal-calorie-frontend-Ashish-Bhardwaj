import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Tracking Your Calories?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8">
          Join thousands of users who are already tracking their nutrition with
          precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
}
