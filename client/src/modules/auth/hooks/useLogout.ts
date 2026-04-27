import { useRouter } from "next/navigation";
import { useAuthStore } from "@/core/store/auth.store";

export const useLogout = () => {
  const router = useRouter();
  const logoutStore = useAuthStore((s) => s.logout);

  const logout = () => {
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    logoutStore(); // clear token + state
    router.push("/login");
  };

  return { logout };
};