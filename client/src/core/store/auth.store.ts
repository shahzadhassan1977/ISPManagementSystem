// core/store/auth.store.ts
import { create } from "zustand";

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
  clearAndRedirect: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("access_token");
    document.cookie = "access_token=; path=/; max-age=0";
    set({ user: null });
  },
  clearAndRedirect: () => {
    localStorage.removeItem("access_token");
    document.cookie = "access_token=; path=/; max-age=0";
    set({ user: null });
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
}));