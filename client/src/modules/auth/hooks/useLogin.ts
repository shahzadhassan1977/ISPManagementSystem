import { useMutation } from "@tanstack/react-query";
import { api } from "@/core/api/client";
import { useAuthStore } from "@/core/store/auth.store";

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },

    onSuccess: (data) => {
      // JWT HANDLING
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);        
      }

      if (data.rememberMe) {
        localStorage.setItem("remember_me", "true");
      }

      document.cookie = 'access_token=${data.access_token}; path=/; max-age=86400';

      setUser(data.user);

      // 🔥 FORCE REDIRECT (important)
      window.location.href = "/dashboard";

    },

    onError: (error: any) => {
      throw error;
    },
  });
};