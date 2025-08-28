import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MealHistory } from "../meal-history";
import { useMealStore } from "@/stores/mealStore";

// Mock the stores
vi.mock("@/stores/mealStore", () => ({
  useMealStore: vi.fn(),
}));

// Mock window.confirm
Object.defineProperty(window, "confirm", {
  writable: true,
  value: vi.fn(),
});

describe("MealHistory", () => {
  const mockRemoveMeal = vi.fn();
  const mockClearHistory = vi.fn();
  const mockExportMealHistory = vi.fn();

  const mockMealHistory = [
    {
      id: "1",
      dish_name: "Grilled Chicken Breast",
      servings: 1,
      calories_per_serving: 390,
      total_calories: 390,
      timestamp: "2025-01-15T10:30:00Z",
      source: "USDA FoodData Central",
    },
    {
      id: "2",
      dish_name: "Salmon Fillet",
      servings: 1.5,
      calories_per_serving: 280,
      total_calories: 420,
      timestamp: "2025-01-15T12:00:00Z",
      source: "USDA FoodData Central",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useMealStore as any).mockReturnValue({
      mealHistory: mockMealHistory,
      removeMeal: mockRemoveMeal,
      clearHistory: mockClearHistory,
      exportMealHistory: mockExportMealHistory,
    });
  });

  it("renders meal history with meals", () => {
    render(<MealHistory />);

    expect(screen.getByText("Meal History")).toBeInTheDocument();
    expect(screen.getByText("Grilled Chicken Breast")).toBeInTheDocument();
    expect(screen.getByText("Salmon Fillet")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("renders empty state when no meals", () => {
    (useMealStore as any).mockReturnValue({
      mealHistory: [],
      removeMeal: mockRemoveMeal,
      clearHistory: mockClearHistory,
      exportMealHistory: mockExportMealHistory,
    });

    render(<MealHistory />);

    expect(screen.getByText("No meals recorded yet")).toBeInTheDocument();
    expect(
      screen.getByText(/Start by calculating calories for a dish/)
    ).toBeInTheDocument();
  });
});
