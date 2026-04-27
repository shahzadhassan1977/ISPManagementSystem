"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/modules/auth/hooks/useLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import router from "next/router";



const schema = z.object({
  email: z.string().email("Enter valid email"),
  //password: z.string().min(6, "Minimum 6 characters"),
  //rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;


export default function LoginPage() {

  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes("access_token=");

    // 🔐 If already logged in → redirect immediately
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin();
  

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
        toast.success("Login successful 🚀");

        // ✅ REDIRECT TO DASHBOARD
        router.push("/dashboard");

      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Invalid credentials ❌"
        );
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

      {/* GLASS CARD */}
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-white text-center">
          ISP Management System
        </h1>
        <p className="text-center text-gray-300 text-sm mb-6">
          Secure Admin Login
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
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

          {/* PASSWORD */}
          {/* <div>
            <label className="text-sm text-gray-200">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full mt-1 px-3 py-2 pr-10 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
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
          </div> */}

          {/* REMEMBER ME */}
          {/* <div className="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" {...register("rememberMe")} />
            <span>Remember me</span>
          </div> */}

          {/* BUTTON */}
          <button
            disabled={isPending}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure ISP Admin Panel
        </p>
      </div>
    </div>
  );
}