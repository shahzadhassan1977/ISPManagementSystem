// core/store/auth.store.ts
import { create } from "zustand";

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("access_token");
    set({ user: null });
  },
}));