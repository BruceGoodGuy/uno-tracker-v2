import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Header from "@/app/features/authen/header";
import { Toaster } from "@/components/ui/sonner"


const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
};

export default function authenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header />
      {children}
      <Toaster />
    </div>
  );
}
