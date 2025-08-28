import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  it("shows validation error for empty dish name", async () => {
    render(<CalorieCalculator />);

    const submitButton = screen.getByRole("button", {
      name: /Calculate Calories/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Dish name is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid servings", async () => {
    render(<CalorieCalculator />);

    const servingsInput = screen.getByLabelText(/Servings/i);
    fireEvent.change(servingsInput, { target: { value: "0" } });

    const submitButton = screen.getByRole("button", {
      name: /Calculate Calories/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Servings must be at least 0.1/i)
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const mockResponse = {
      dish_name: "Grilled Chicken Breast",
      servings: 1,
      calories_per_serving: 390,
      total_calories: 390,
      source: "USDA FoodData Central",
    };

    mockCalculateCalories.mockResolvedValue(mockResponse);

    render(<CalorieCalculator />);

    const dishInput = screen.getByLabelText(/Dish Name/i);
    const servingsInput = screen.getByLabelText(/Servings/i);
    const submitButton = screen.getByRole("button", {
      name: /Calculate Calories/i,
    });

    fireEvent.change(dishInput, {
      target: { value: "Grilled Chicken Breast" },
    });
    fireEvent.change(servingsInput, { target: { value: "1" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCalculateCalories).toHaveBeenCalledWith({
        dish_name: "Grilled Chicken Breast",
        servings: 1,
      });
    });
  });

  it("displays loading state during calculation", () => {
    (useMealStore as any).mockReturnValue({
      calculateCalories: mockCalculateCalories,
      isLoading: true,
    });

    render(<CalorieCalculator />);

    expect(screen.getByText(/Calculating.../i)).toBeInTheDocument();
  });
});
