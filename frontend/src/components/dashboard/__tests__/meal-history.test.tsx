import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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

  it("calls removeMeal when delete button is clicked", async () => {
    render(<MealHistory />);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockRemoveMeal).toHaveBeenCalledWith("1");
    });
  });

  it("calls clearHistory when clear all button is clicked and confirmed", async () => {
    (window.confirm as any).mockReturnValue(true);

    render(<MealHistory />);

    const clearButton = screen.getByText("Clear All");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        "Are you sure you want to clear all meal history? This action cannot be undone."
      );
      expect(mockClearHistory).toHaveBeenCalled();
    });
  });

  it("does not call clearHistory when clear all is cancelled", async () => {
    (window.confirm as any).mockReturnValue(false);

    render(<MealHistory />);

    const clearButton = screen.getByText("Clear All");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
      expect(mockClearHistory).not.toHaveBeenCalled();
    });
  });

  it("calls exportMealHistory when export button is clicked", async () => {
    render(<MealHistory />);

    const exportButton = screen.getByText("Export");
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(mockExportMealHistory).toHaveBeenCalled();
    });
  });

  it("displays meal information correctly", () => {
    render(<MealHistory />);

    expect(screen.getByText("Grilled Chicken Breast")).toBeInTheDocument();
    expect(screen.getByText("Servings: 1")).toBeInTheDocument();
    expect(screen.getByText("390 cal")).toBeInTheDocument();
    expect(screen.getByText("Salmon Fillet")).toBeInTheDocument();
    expect(screen.getByText("Servings: 1.5")).toBeInTheDocument();
    expect(screen.getByText("420 cal")).toBeInTheDocument();
  });

  it("shows total meal count when more than 10 meals", () => {
    const manyMeals = Array.from({ length: 15 }, (_, i) => ({
      id: `${i}`,
      dish_name: `Meal ${i}`,
      servings: 1,
      calories_per_serving: 300,
      total_calories: 300,
      timestamp: "2025-01-15T10:30:00Z",
      source: "USDA FoodData Central",
    }));

    (useMealStore as any).mockReturnValue({
      mealHistory: manyMeals,
      removeMeal: mockRemoveMeal,
      clearHistory: mockClearHistory,
      exportMealHistory: mockExportMealHistory,
    });

    render(<MealHistory />);

    expect(
      screen.getByText(/Showing 10 most recent meals. Total: 15 meals/)
    ).toBeInTheDocument();
  });
});
