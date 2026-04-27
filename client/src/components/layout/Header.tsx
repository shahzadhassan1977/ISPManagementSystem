"use client";

import { useState } from "react";
import { useAuthStore } from "@/core/store/auth.store";
import { useLogout } from "@/modules/auth/hooks/useLogout";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-4">

      <input
        placeholder="Search..."
        className="border rounded-lg px-3 py-1 w-64"
      />

      {/* USER MENU */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full" />
          <span className="text-sm">
            {user?.name || "Admin"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded-lg border">

            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
              Profile
            </button>

            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
              Settings
            </button>

            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </header>
  );
}