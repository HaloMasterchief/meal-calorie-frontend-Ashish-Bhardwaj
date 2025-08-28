import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CalorieCalculator } from "../calorie-calculator";
import { useMealStore } from "@/stores/mealStore";

// Mock the stores
vi.mock("@/stores/mealStore", () => ({
  useMealStore: vi.fn(),
}));

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("CalorieCalculator", () => {
  const mockCalculateCalories = vi.fn();
  const mockIsLoading = false;

  beforeEach(() => {
    vi.clearAllMocks();
    (useMealStore as any).mockReturnValue({
      calculateCalories: mockCalculateCalories,
      isLoading: mockIsLoading,
    });
  });

  it("renders the calculator form", () => {
    render(<CalorieCalculator />);

    expect(screen.getByText("Calorie Calculator")).toBeInTheDocument();
    expect(screen.getByLabelText(/Dish Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servings/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Calculate Calories/i })
    ).toBeInTheDocument();
  });
});
