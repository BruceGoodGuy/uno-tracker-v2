import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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
  BookCopy,
  AlertCircle,
  Facebook,
} from "lucide-react";

export default function LandingPage({ children }) {
  const isSubscribed = false;
  const notifyEmail = [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Uno Scorer</span>
          </div>
          <Link href="/dev">
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
              <Play className="w-5 h-5 mr-2" />
              Try Demo
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Construction Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
            <Construction className="w-4 h-4" />
            Currently in Development
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Ultimate
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-600">
              {" "}
              Uno Scoring{" "}
            </span>
            Experience
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your Uno games with friends, analyze your performance, and
            never lose count of scores again. Built for mobile-first gaming
            sessions.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dev" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                <Play className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </Link>
            <a
              href="https://github.com/BruceGoodGuy/uno-tracker-v2"
              target="_blank"
              className="w-full sm:w-auto justify-center flex items-center gap-2 text-gray-900 hover:text-gray-700"
            >
              <Button
                size={"lg"}
                variant="outline"
                className="h-14 px-8 text-lg bg-white from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                <BookCopy className="w-4 h-4 ml-2" />
                Source Code
              </Button>
            </a>
          </div>

          {/* App Preview */}
          <div className="relative max-w-sm mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-2 border border-gray-200">
              <div className="bg-gray-100 rounded-2xl aspect-[9/16] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">App Preview</p>
                  <p className="text-sm text-gray-500">Coming Soon</p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <BarChart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your Uno games professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Multiplayer Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Add unlimited players, manage them during games, and track
                  individual performance across sessions.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Scoring
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  One-tap winner selection with automatic score calculation.
                  Customizable scoring rules and manual adjustments.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Advanced Analytics
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Detailed statistics, win rates, performance trends, and
                  comprehensive game history tracking.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mobile First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimized for one-hand control with large touch targets and
                  thumb-friendly navigation.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Public Viewer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Share live game progress with spectators. Real-time updates
                  and leaderboard display.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Rules
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Flexible game settings with custom end conditions, scoring
                  rules, and time limits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Development Progress
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;re building something amazing. Here&apos;s what&apos;s
              completed and what&apos;s coming next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Completed Features */}
            <Card className="border-0 shadow-lg bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  Completed Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Mobile-first UI design",
                  "Player management system",
                  "Smart scoring algorithm",
                  "Game history tracking",
                  "Analytics dashboard",
                  "Public viewer mode",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Coming Soon */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Rocket className="w-5 h-5" />
                  Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Social authentication",
                  "Real-time multiplayer",
                  "Push notifications",
                  "Tournament mode",
                  "Player achievements",
                  "Data export features",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Uno Scorer</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The ultimate mobile-first Uno scoring application. Track games,
                analyze performance, and never lose count again.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/BruceGoodGuy/uno-tracker-v2"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
                  >
                    <BookCopy className="w-5 h-5" />
                  </Button>
                </a>
                <a href="https://www.facebook.com/khoauth/" target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer disabled"
                >
                  <Globe className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <p>Features</p>
                <p>Pricing</p>
                <p>Roadmap</p>
                <p>Updates</p>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <p>Documentation</p>
                <p>Help Center</p>
                <p>Contact</p>
                <p>Status</p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 BruceGoodGuy. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <button className="hover:text-white">Privacy Policy</button>
              <button className="hover:text-white">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
