import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CalorieCalculator } from "@/components/dashboard/calorie-calculator";
import { MealHistory } from "@/components/dashboard/meal-history";
import { Analytics } from "@/components/dashboard/analytics";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Sparkles, TrendingUp, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nutrition Dashboard
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculate calories for your meals and track your nutrition journey
              with precision and ease.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-500" />
                <span>Accurate Calculations</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span>Track Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>Smart Insights</span>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Overview
              </h2>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <Analytics />
            </Suspense>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Calorie Calculator */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Calculate Calories
                </h2>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <CalorieCalculator />
              </Suspense>
            </div>

            {/* Quick Stats or Tips */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Quick Tips
                </h2>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Be Specific
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Include cooking methods like "grilled", "baked", or
                        "fried" for more accurate calorie calculations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Track Regularly
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Log your meals consistently to get better insights into
                        your nutrition patterns and progress.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Export Data
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use the export feature to keep backup of your meal
                        history or share with your nutritionist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal History Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Meal History
              </h2>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <MealHistory />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
