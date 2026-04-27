// core/api/client.ts
import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


// =========================
// 🔐 REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});


// =========================
// ❌ RESPONSE INTERCEPTOR (IMPORTANT)
// =========================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  
  (error) => {
    const status = error?.response?.status;   
    
    let message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

      if(!message)
      {
        message = "Network error";
      }
      else if(message == 400)
      {
        message="Bad request";
      }
       else if(message == 401)
      {
        message="Unauthorized";
      }
       else if(message == 500)
      {
        message="Server error";
      }
      else
      {
         message="Unknown error";
      }
    // 🔥 GLOBAL TOAST HANDLING
    toast.error(message);

    // 🔐 AUTO LOGOUT ON 401 (IMPORTANT FOR YOUR ISP SYSTEM)
    if (status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);