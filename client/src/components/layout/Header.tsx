"use client";

import { useState } from "react";
import { useAuthStore } from "@/core/store/auth.store";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { useTheme } from "@/providers/ThemeProvider";
import { Menu, Moon, Sun } from "lucide-react";

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const user = useAuthStore((s) => s.user);
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="h-14 bg-white dark:bg-slate-900 shadow flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:block">
          <input
            placeholder="Search..."
            className="border rounded-lg px-3 py-1 w-64 bg-slate-50 text-slate-900 border-slate-200 transition placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600" />
            <span className="text-sm">{user?.name || "Admin"}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <button className="block w-full text-left px-3 py-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                Profile
              </button>
              <button className="block w-full text-left px-3 py-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                Settings
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-red-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
