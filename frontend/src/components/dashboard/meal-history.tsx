"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMealStore } from "@/stores/mealStore";
import { formatDate, formatCalories } from "@/lib/utils";
import {
  Trash2,
  Download,
  History,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function MealHistory() {
  const { mealHistory, removeMeal, clearHistory, exportMealHistory } =
    useMealStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleRemoveMeal = (id: string) => {
    removeMeal(id);
  };

  const handleClearHistory = () => {
    if (
      confirm(
        "Are you sure you want to clear all meal history? This action cannot be undone."
      )
    ) {
      clearHistory();
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportMealHistory();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

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

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <History className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Meal History
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your nutrition journey
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={isExporting || mealHistory.length === 0}
                className="transition-all duration-200 hover:bg-green-50 hover:border-green-200 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:border-green-700 dark:hover:text-green-400"
              >
                {isExporting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-green-500 border-t-transparent" />
                    <span>Exporting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </div>
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearHistory}
                disabled={mealHistory.length === 0}
                className="transition-all duration-200 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:border-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <AnimatePresence mode="wait">
            {mealHistory.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      No meals recorded yet
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                      Start by calculating calories for a dish using the
                      calculator above. Your meal history will appear here for
                      easy tracking.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="meal-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {mealHistory.slice(0, 10).map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    variants={itemVariants}
                    layout
                    className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                                {meal.dish_name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Added {formatDate(meal.timestamp)}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Servings:{" "}
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {meal.servings}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Per serving:{" "}
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {formatCalories(meal.calories_per_serving)}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Total:{" "}
                                <span className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                  {formatCalories(meal.total_calories)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMeal(meal.id)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {mealHistory.length > 10 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <History className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Showing 10 most recent meals. Total:{" "}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {mealHistory.length}
                        </span>{" "}
                        meals
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
