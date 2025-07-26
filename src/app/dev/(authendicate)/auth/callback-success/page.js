"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/useAuthStore";
import Loading from "@/app/components/Loading";

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
    <Loading />
  );
}
