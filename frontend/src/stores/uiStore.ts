import { create } from "zustand";
import type { Theme } from "@/types";

interface SimpleUIStore {
  theme: Theme;
  sidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<SimpleUIStore>((set) => ({
  theme: "system",
  sidebarOpen: false,

  setTheme: (theme: Theme) => {
    set({ theme });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },
}));
