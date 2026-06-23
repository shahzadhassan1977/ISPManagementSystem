import { useMutation } from "@tanstack/react-query";
import { api } from "@/core/api/client";
import { useAuthStore } from "@/core/store/auth.store";
import { AuthUser, parseJwt } from "@/utils/auth";

type LoginInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type LoginResponse = {
  access_token?: string;
  rememberMe?: boolean;
  user?: AuthUser;
};

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    onMutate: () => {
      localStorage.removeItem("access_token");
      document.cookie = "access_token=; path=/; max-age=0";
    },

    mutationFn: async (data: LoginInput): Promise<LoginResponse> => {
      const res = await api.post("/auth/login", data);
      return res.data.data;
    },

    onSuccess: (data) => {
      const accessToken = data.access_token;

      if (!accessToken) {
        throw new Error("Login response did not include an access token");
      }

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        document.cookie = `access_token=${encodeURIComponent(
          accessToken,
        )}; path=/; max-age=86400`;
      }

      if (data.rememberMe) {
        localStorage.setItem("remember_me", "true");
      }


      console.log("data user ---",data);

      const authUser = data.user ?? parseJwt(accessToken);
      setUser(authUser || null);

      window.location.href = "/dashboard";
    },

    onError: (error: unknown) => {
      throw error;
    },
  });
};
