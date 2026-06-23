"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuthStore } from "@/core/store/auth.store";
import { parseJwt, getTokenFromCookie, isTokenExpired, isAdminUser } from "@/utils/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const clearAndRedirect = useAuthStore((s) => s.clearAndRedirect);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token") || getTokenFromCookie()
        : null;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (isTokenExpired(token)) {
      clearAndRedirect();
      return;
    }

    const parsed = parseJwt(token);
    if (!parsed) {
      console.warn("Failed to parse JWT during auth refresh, redirecting to login.");
      clearAndRedirect();
      return;
    }

    if (isAdminUser(parsed)) {
      console.debug("Admin JWT refresh payload:", parsed);
    }

    setUser(parsed);
    setIsReady(true);
  }, [router, setUser, clearAndRedirect]);

  if (!isReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          Checking authentication...
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col bg-gray-100">

        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}