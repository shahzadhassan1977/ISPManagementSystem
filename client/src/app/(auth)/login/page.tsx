"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { getTokenFromCookie, isTokenExpired } from "@/utils/auth";

const schema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin();

  useEffect(() => {
    const token = localStorage.getItem("access_token") || getTokenFromCookie();

    if (token && !isTokenExpired(token)) {
      router.replace("/dashboard");
      return;
    }

    if (token) {
      localStorage.removeItem("access_token");
      document.cookie = "access_token=; path=/; max-age=0";
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Login successful");
      },
      onError: (err: unknown) => {
        const message =
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          err.response.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
            ? String(err.response.data.message)
            : "Invalid credentials";

        toast.error(message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center">
          ISP Management System
        </h1>
        <p className="text-center text-gray-300 text-sm mb-6">
          Secure Admin Login
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-gray-200">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="admin@isp.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-200">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full mt-1 px-3 py-2 pr-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" {...register("rememberMe")} />
            <span>Remember me</span>
          </div>

          <button
            disabled={isPending}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Secure ISP Admin Panel
        </p>
      </div>
    </div>
  );
}
