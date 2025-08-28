import { describe, it, expect } from "vitest";
import { formatCalories, formatNumber, formatDate, capitalize } from "../utils";

describe("Utility Functions", () => {
  describe("formatCalories", () => {
    it("formats calories correctly", () => {
      expect(formatCalories(100)).toBe("100 cal");
      expect(formatCalories(1234)).toBe("1,234 cal");
      expect(formatCalories(0)).toBe("0 cal");
    });

    it("rounds calories to nearest integer", () => {
      expect(formatCalories(100.7)).toBe("101 cal");
      expect(formatCalories(100.3)).toBe("100 cal");
    });
  });

  describe("formatNumber", () => {
    it("formats numbers with commas", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1234567)).toBe("1,234,567");
      expect(formatNumber(0)).toBe("0");
    });
  });

  describe("formatDate", () => {
    it("formats dates correctly", () => {
      const date = new Date("2025-01-15T10:30:00Z");
      expect(formatDate(date)).toMatch(/Jan 15, 2025/);
    });

    it("handles string dates", () => {
      expect(formatDate("2025-01-15T10:30:00Z")).toMatch(/Jan 15, 2025/);
    });
  });

  describe("capitalize", () => {
    it("capitalizes first letter and makes rest lowercase", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("WORLD")).toBe("World");
      expect(capitalize("tEsT")).toBe("Test");
    });
  });
});
