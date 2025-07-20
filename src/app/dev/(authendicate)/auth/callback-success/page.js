"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/useAuthStore";

export default function AuthCallbackPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const user = await res.json();
        setUser(user);
        setIsAuthenticated(true);
        router.replace("/dev/auth");
      } else {
        router.replace("/dev");
      }
    })();
  }, [router, setUser]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-blue-600">Loading...</p>
    </div>
  );
}
