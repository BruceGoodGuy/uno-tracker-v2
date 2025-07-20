"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Plus,
  Users,
  Trophy,
  History,
  Settings,
  Eye,
  UserPlus,
  Crown,
  ArrowLeft,
  UserMinus,
  Edit3,
  Check,
  X,
  MoreVertical,
  Clock,
  Target,
  BarChart3,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  Timer,
  Hash,
  Mail,
  Smartphone,
  Shield,
  LogIn,
  ArrowRight,
  Play,
  BarChart,
  Bell,
  Github,
  Twitter,
  Globe,
  Construction,
  Rocket,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import useAuthStore from "@/lib/useAuthStore";
import { shortName } from "@/lib/utils";
import LogoutDialog from "@/app/components/LogoutDialog";
import { useState } from "react";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const [open, setOpen] = useState(false);

  async function signOut() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        console.error("Logout failed", res.statusText);
        toast.error("Logout failed, please try again.");
        return;
      }
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logout successful!");
      router.push("/dev");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed, please try again.");
    }
  }
  return (
    <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{shortName(user?.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">Ready to play!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10"
            onClick={() => setOpen(true)}
          >
            <LogIn className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <LogoutDialog open={open} onOpenChange={setOpen} action={signOut} />
    </div>
  );
}
