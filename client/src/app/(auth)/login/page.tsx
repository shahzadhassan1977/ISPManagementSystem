"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
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
    <main className="grid min-h-screen bg-[#f4f7fb] dark:bg-slate-950 lg:grid-cols-[minmax(430px,0.86fr)_1.14fr]">
      <section className="relative isolate flex min-h-[230px] flex-col overflow-hidden bg-gradient-to-br from-[#102f66] to-[#0b2149] px-6 pb-10 pt-8 text-white sm:px-10 lg:min-h-screen lg:px-16 lg:py-14">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[#163d7a]/55 [clip-path:polygon(0_48%,24%_22%,55%_72%,100%_36%,100%_100%,0_100%)] lg:h-64" />
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0" role="img" aria-label="M3-Solution logo">
            <rect width="48" height="48" rx="9" fill="#ffffff" />
            <path d="M6 37V11l13 13 12-13v26h-9V28l-4 4-5-4v9z" fill="#1768bd" />
            <path d="M31 12h15L37 24c8-1 11 3 11 7 0 6-5 9-12 9-5 0-9-1-12-4l5-6c2 2 4 3 7 3 2 0 3-1 3-2s-2-2-5-2h-4l5-9h-9z" fill="#f28a16" />
          </svg>
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-normal sm:text-xl">M3-Solution</p>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.15em] text-blue-200">ISP MANAGEMENT</p>
          </div>
        </div>

        <div className="mt-10 max-w-md lg:my-auto lg:mt-0 lg:pb-10">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Welcome back.</h1>
          <p className="mt-3 text-sm text-blue-100 sm:text-base">Sign in to continue to your workspace.</p>
          <div className="mt-7 hidden items-start gap-3 lg:flex">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-blue-300/30 bg-blue-400/10 text-orange-300">
              <LockKeyhole size={16} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Secure account access</p>
              <p className="mt-1 text-xs text-blue-200">Your credentials are protected.</p>
            </div>
          </div>
        </div>

        <p className="mt-8 hidden text-[10px] text-blue-200/80 lg:block">M3-Solution · ISP Management</p>
      </section>

      <section className="flex items-center justify-center px-4 pb-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="-mt-7 w-full max-w-[520px] rounded-xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(20,46,92,0.10)] dark:border-slate-700 dark:bg-slate-900 sm:mt-0 sm:p-9 lg:p-12">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#245fae] dark:text-blue-300">Account access</p>
            <span className="mb-3 block h-[3px] w-10 rounded-full bg-[#f28a16]" />
            <h2 className="text-2xl font-bold text-[#142e5c] dark:text-blue-100 sm:text-[28px]">Sign in</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Use your administrator account details below.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="text-xs font-semibold text-slate-700 dark:text-slate-200">Email address</label>
              <div className="relative mt-2">
                <Mail size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  {...register("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "login-email-error" : undefined}
                  className="min-h-[50px] w-full rounded-md border border-slate-300 bg-white pl-11 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2468bd] focus:ring-4 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-950"
                  placeholder="admin@isp.com"
                />
              </div>
              {errors.email && <p id="login-email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="text-xs font-semibold text-slate-700 dark:text-slate-200">Password</label>
              <div className="relative mt-2">
                <LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
                  className="min-h-[50px] w-full rounded-md border border-slate-300 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2468bd] focus:ring-4 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-950"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-[#142e5c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2468bd] dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p id="login-password-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.password.message}</p>}
            </div>

            <label className="flex min-h-8 cursor-pointer items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 rounded border-slate-300 accent-[#f28a16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2468bd] focus-visible:ring-offset-2 dark:border-slate-600 dark:focus-visible:ring-offset-slate-900"
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-md bg-[#142e5c] px-4 text-sm font-semibold text-white transition hover:bg-[#1d447d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-blue-900"
            >
              {isPending ? "Signing in..." : "Sign in"}
              {!isPending && <ArrowRight size={16} aria-hidden="true" />}
            </button>
          </form>

          <div className="mt-7 flex items-center gap-2.5 border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <ShieldCheck size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Secure ISP Admin Panel</span>
          </div>
        </div>
      </section>
    </main>
  );
}
