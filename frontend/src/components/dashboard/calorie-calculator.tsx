"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMealStore } from "@/stores/mealStore";
import { toast } from "react-hot-toast";
import { formatCalories } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Sparkles, TrendingUp, Clock } from "lucide-react";

const calculatorSchema = z.object({
  dish_name: z.string().min(1, "Dish name is required"),
  servings: z.number().min(0.1, "Servings must be at least 0.1"),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

export function CalorieCalculator() {
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { calculateCalories, isLoading } = useMealStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      servings: 1,
    },
    mode: "onChange",
  });

  const watchedDish = watch("dish_name");
  const watchedServings = watch("servings");

  const onSubmit = async (data: CalculatorFormData) => {
    setIsCalculating(true);
    try {
      const response = await calculateCalories(data);
      setResult(response);
      toast.success("Calories calculated successfully!");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Calculation failed"
      );
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <CardHeader className="relative">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calorie Calculator
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Get accurate calorie information for any dish
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="dish_name" className="text-sm font-medium">
                Dish Name
              </Label>
              <div className="relative">
                <Input
                  id="dish_name"
                  type="text"
                  placeholder="e.g., Grilled Chicken Breast"
                  className="pl-10 pr-4 h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  {...register("dish_name")}
                  error={errors.dish_name?.message}
                />
                <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.dish_name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.dish_name.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="servings" className="text-sm font-medium">
                Servings
              </Label>
              <div className="relative">
                <Input
                  id="servings"
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="1"
                  className="pl-10 pr-4 h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  {...register("servings", { valueAsNumber: true })}
                  error={errors.servings?.message}
                />
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.servings && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.servings.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                loading={isLoading || isCalculating}
                disabled={!isValid || isLoading || isCalculating}
              >
                {isLoading || isCalculating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Calculating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-4 w-4" />
                    <span>Calculate Calories</span>
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10" />
                <div className="relative p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200 text-lg">
                      Calculation Results
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Dish:
                        </span>
                        <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                          {result.dish_name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Servings:
                        </span>
                        <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                          {result.servings}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Per Serving:
                        </span>
                        <span className="text-sm font-bold text-green-800 dark:text-green-200">
                          {formatCalories(result.calories_per_serving)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          Total:
                        </span>
                        <span className="text-lg font-bold text-green-800 dark:text-green-200">
                          {formatCalories(result.total_calories)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Source: {result.source}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Tips */}
          {!result && watchedDish && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Pro Tip
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                    Be specific with dish names for more accurate results.
                    Include cooking methods like "grilled", "baked", or "fried".
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
