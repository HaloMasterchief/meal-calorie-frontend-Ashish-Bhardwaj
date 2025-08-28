import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiCall } from "@/lib/utils";
import type {
  MealHistoryItem,
  CalorieResponse,
  CalorieRequest,
  MealStore,
} from "@/types";

export const useMealStore = create<MealStore>()(
  persist(
    (set, get) => ({
      mealHistory: [],
      isLoading: false,
      error: null,

      addMeal: (meal: CalorieResponse) => {
        const newMeal: MealHistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          dish_name: meal.dish_name,
          servings: meal.servings,
          calories_per_serving: meal.calories_per_serving,
          total_calories: meal.total_calories,
          timestamp: new Date().toISOString(),
          source: meal.source,
        };

        set((state: any) => ({
          mealHistory: [newMeal, ...state.mealHistory].slice(0, 100),
        }));
      },

      clearHistory: () => {
        set({ mealHistory: [] });
      },

      removeMeal: (id: string) => {
        set((state: any) => ({
          mealHistory: state.mealHistory.filter((meal: any) => meal.id !== id),
        }));
      },

      calculateCalories: async (req: CalorieRequest) => {
        set({ isLoading: true, error: null });

        try {
          const resp: CalorieResponse = await apiCall("/get-calories", {
            method: "POST",
            body: JSON.stringify(req),
          });

          get().addMeal(resp);

          set({ isLoading: false });
          return resp;
        } catch (err) {
          const errMsg =
            err instanceof Error ? err.message : "An error occurred";
          set({ isLoading: false, error: errMsg });
          throw err;
        }
      },

      getStats: () => {
        const { mealHistory } = get();

        if (mealHistory.length === 0) {
          return {
            totalMeals: 0,
            totalCalories: 0,
            averageCaloriesPerMeal: 0,
            mostPopularDish: "",
            caloriesByDay: [],
          };
        }

        const totalMeals = mealHistory.length;
        const totalCalories = mealHistory.reduce(
          (sum: number, meal: any) => sum + meal.total_calories,
          0
        );
        const avgCaloriesPerMeal = totalCalories / totalMeals;

        const dishCounts = mealHistory.reduce(
          (acc: any, meal: any) => {
            acc[meal.dish_name] = (acc[meal.dish_name] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        const mostPopularDish = Object.entries(dishCounts).reduce((a, b) =>
          dishCounts[a[0]] > dishCounts[b[0]] ? a : b
        )[0];

        const caloriesByDay = mealHistory.reduce(
          (acc: any, meal: any) => {
            const date = new Date(meal.timestamp).toDateString();
            acc[date] = (acc[date] || 0) + meal.total_calories;
            return acc;
          },
          {} as Record<string, number>
        );

        const caloriesByDayArray = Object.entries(caloriesByDay)
          .map(([date, calories]) => ({ date, calories }))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 7);

        return {
          totalMeals,
          totalCalories,
          averageCaloriesPerMeal: avgCaloriesPerMeal,
          mostPopularDish,
          caloriesByDay: caloriesByDayArray,
        };
      },

      getMealsByDateRange: (startDate: Date, endDate: Date) => {
        const { mealHistory } = get();

        return mealHistory.filter((meal: any) => {
          const mealDate = new Date(meal.timestamp);
          return mealDate >= startDate && mealDate <= endDate;
        });
      },

      getTodayMeals: () => {
        const today = new Date();
        const startOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const endOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59
        );

        return get().getMealsByDateRange(startOfDay, endOfDay);
      },

      getWeekMeals: () => {
        const today = new Date();
        const startOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        const endOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 6,
          23,
          59,
          59
        );

        return get().getMealsByDateRange(startOfWeek, endOfWeek);
      },

      getMonthMeals: () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
          23,
          59,
          59
        );

        return get().getMealsByDateRange(startOfMonth, endOfMonth);
      },

      searchMeals: (query: string) => {
        const { mealHistory } = get();
        const lowerQuery = query.toLowerCase();

        return mealHistory.filter((meal: any) =>
          meal.dish_name.toLowerCase().includes(lowerQuery)
        );
      },

      getUniqueDishes: () => {
        const { mealHistory } = get();
        const dishes = mealHistory.map((meal: any) => meal.dish_name);
        return Array.from(new Set(dishes));
      },

      getMealCountByDish: () => {
        const { mealHistory } = get();

        return mealHistory.reduce(
          (acc: any, meal: any) => {
            acc[meal.dish_name] = (acc[meal.dish_name] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );
      },

      getTotalCaloriesByDish: () => {
        const { mealHistory } = get();

        return mealHistory.reduce(
          (acc: any, meal: any) => {
            acc[meal.dish_name] =
              (acc[meal.dish_name] || 0) + meal.total_calories;
            return acc;
          },
          {} as Record<string, number>
        );
      },

      exportMealHistory: () => {
        const { mealHistory } = get();

        const csvContent = [
          [
            "Date",
            "Dish Name",
            "Servings",
            "Calories per Serving",
            "Total Calories",
            "Source",
          ],
          ...mealHistory.map((meal: any) => [
            new Date(meal.timestamp).toLocaleDateString(),
            meal.dish_name,
            meal.servings.toString(),
            meal.calories_per_serving.toString(),
            meal.total_calories.toString(),
            meal.source,
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `meal-history-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },

      importMealHistory: (meals: MealHistoryItem[]) => {
        set((state: any) => ({
          mealHistory: [...meals, ...state.mealHistory].slice(0, 100),
        }));
      },
    }),
    {
      name: "meal-storage",
      partialize: (state: any) => ({
        mealHistory: state.mealHistory,
      }),
    }
  )
);
