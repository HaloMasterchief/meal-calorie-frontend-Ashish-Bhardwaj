"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMealStore } from "@/stores/mealStore";
import { formatCalories, formatNumber } from "@/lib/utils";
import {
  TrendingUp,
  Calendar,
  Target,
  BarChart3,
  Flame,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export function Analytics() {
  const { getStats } = useMealStore();
  const stats = getStats();

  const cards = [
    {
      title: "Total Meals",
      value: formatNumber(stats.totalMeals),
      icon: Calendar,
      description: "Meals recorded",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      darkBgGradient: "from-blue-900/20 to-blue-800/20",
    },
    {
      title: "Total Calories",
      value: formatCalories(stats.totalCalories),
      icon: Flame,
      description: "Calories consumed",
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "from-orange-900/20 to-red-900/20",
    },
    {
      title: "Average per Meal",
      value: formatCalories(stats.averageCaloriesPerMeal),
      icon: Target,
      description: "Average calories",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      darkBgGradient: "from-green-900/20 to-emerald-900/20",
    },
    {
      title: "Most Popular",
      value: stats.mostPopularDish || "None",
      icon: BarChart3,
      description: "Frequently eaten",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={card.title} variants={cardVariants}>
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} dark:${card.darkBgGradient} opacity-50`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm" />

              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {card.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>

              <CardContent className="relative">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {card.value}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`}
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Progress indicator for some cards */}
                {card.title === "Total Calories" && stats.totalCalories > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Daily Goal</span>
                      <span>2000 cal</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${card.gradient}`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min((stats.totalCalories / 2000) * 100, 100)}%`,
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {card.title === "Average per Meal" &&
                  stats.averageCaloriesPerMeal > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Target</span>
                        <span>500 cal</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${card.gradient}`}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min((stats.averageCaloriesPerMeal / 500) * 100, 100)}%`,
                          }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      {/* Additional insights section */}
      {stats.totalMeals > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="col-span-full"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">
                  Quick Insights
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Last Meal
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.totalMeals > 0 ? "Today" : "No meals yet"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Target className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Streak
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.totalMeals} meals taken
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Trend
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.totalMeals > 1
                        ? "Consistent tracking"
                        : "Getting started"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
