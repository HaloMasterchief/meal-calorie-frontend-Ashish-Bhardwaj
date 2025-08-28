// User types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

export interface AuthUser extends Omit<User, "_id"> {
  id: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  token: string;
}

// Calorie calculation types
export interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

// Meal history types
export interface MealHistoryItem {
  id: string;
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  timestamp: string;
  source: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select";
  placeholder?: string;
  required?: boolean;
  validation?: any;
  options?: Array<{ value: string; label: string }>;
}

// UI Component types
export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  name?: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Store types
export interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
  initialize: () => void;
}

export interface MealStore {
  mealHistory: MealHistoryItem[];
  isLoading: boolean;
  error: string | null;
  addMeal: (meal: CalorieResponse) => void;
  clearHistory: () => void;
  removeMeal: (id: string) => void;
  calculateCalories: (request: CalorieRequest) => Promise<CalorieResponse>;
  getStats: () => any;
  getMealsByDateRange: (startDate: Date, endDate: Date) => MealHistoryItem[];
  getTodayMeals: () => MealHistoryItem[];
  getWeekMeals: () => MealHistoryItem[];
  getMonthMeals: () => MealHistoryItem[];
  searchMeals: (query: string) => MealHistoryItem[];
  getUniqueDishes: () => string[];
  getMealCountByDish: () => Record<string, number>;
  getTotalCaloriesByDish: () => Record<string, number>;
  exportMealHistory: () => void;
  importMealHistory: (meals: MealHistoryItem[]) => void;
}

export interface UIStore {
  theme: Theme;
  sidebarOpen: boolean;
  notifications: Notification[];
  modals: Record<string, any>;
  loadingStates: Record<string, boolean>;
  formData: Record<string, any>;
  searchQuery: string;
  filters: Record<string, any>;
  sortBy: { field: string; order: "asc" | "desc" };
  pagination: { page: number; limit: number };
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  openModal: (id: string, data?: any) => void;
  closeModal: (id: string) => void;
  setLoadingState: (key: string, loading: boolean) => void;
  getLoadingState: (key: string) => boolean;
  setFormData: (formId: string, data: any) => void;
  getFormData: (formId: string) => any;
  setSearchQuery: (query: string) => void;
  getSearchQuery: () => string;
  setFilters: (filters: Record<string, any>) => void;
  getFilters: () => Record<string, any>;
  clearFilters: () => void;
  setSortBy: (field: string, order: "asc" | "desc") => void;
  getSortBy: () => { field: string; order: "asc" | "desc" };
  setPagination: (page: number, limit: number) => void;
  getPagination: () => { page: number; limit: number };
  initializeTheme: () => void;
  setupThemeListener: () => void;
  resetUI: () => void;
}

// Error types
export interface ApiError {
  success: false;
  error: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Notification types
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
}

// Chart types
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
}

// Analytics types
export interface AnalyticsData {
  totalMeals: number;
  totalCalories: number;
  averageCaloriesPerMeal: number;
  mostPopularDish: string;
  caloriesByDay: Array<{
    date: string;
    calories: number;
  }>;
}

// Settings types
export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
  };
  privacy: {
    shareData: boolean;
    publicProfile: boolean;
  };
  preferences: {
    defaultServings: number;
    preferredUnits: "metric" | "imperial";
    theme: Theme;
  };
}
