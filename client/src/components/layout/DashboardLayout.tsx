"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes("access_token=");

    if (!token) {
      router.replace("/login");
      return;
    }

    setIsReady(true);
  }, [router]);

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