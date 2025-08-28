import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiCall } from "@/lib/utils";
import type {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AuthStore,
} from "@/types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (creds: LoginCredentials) => {
        set({ isLoading: true });

        try {
          const resp: AuthResponse = await apiCall("/auth/login", {
            method: "POST",
            body: JSON.stringify(creds),
          });

          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", resp.token);
          }

          const usr: AuthUser = {
            id: "temp-user-id",
            firstName: "User",
            lastName: "",
            email: creds.email,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullName: "User",
          };

          set({
            user: usr,
            token: resp.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (creds: RegisterCredentials) => {
        set({ isLoading: true });

        try {
          const resp: AuthResponse = await apiCall("/auth/register", {
            method: "POST",
            body: JSON.stringify(creds),
          });

          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", resp.token);
          }

          const usr: AuthUser = {
            id: "temp-user-id",
            firstName: creds.firstName,
            lastName: creds.lastName,
            email: creds.email,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fullName: `${creds.firstName} ${creds.lastName}`,
          };

          set({
            user: usr,
            token: resp.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateProfile: async (updates: Partial<AuthUser>) => {
        const currUser = get().user;
        if (!currUser) {
          throw new Error("No user logged in");
        }

        set({
          user: {
            ...currUser,
            ...updates,
            fullName: `${updates.firstName || currUser.firstName} ${updates.lastName || currUser.lastName}`,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      initialize: () => {
        if (typeof window !== "undefined") {
          const tok = localStorage.getItem("auth_token");
          if (tok) {
            set({
              user: null,
              token: tok,
              isAuthenticated: true,
            });
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
