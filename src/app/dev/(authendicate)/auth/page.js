"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
};

const mockActiveGame = {
  id: 1,
  name: "Weekend Tournament",
  status: "in_progress",
  settings: {
    endCondition: "score",
    scoreToWin: 500,
    maxRounds: 10,
    timeLimit: 120,
    winnerGetsAll: true,
    customPoints: 50,
  },
  players: [
    { id: 1, name: "Alice", score: 45, isHost: false, roundScore: 0 },
    { id: 2, name: "Bob", score: 23, isHost: true, roundScore: 0 },
    { id: 3, name: "Charlie", score: 67, isHost: false, roundScore: 0 },
  ],
  round: 3,
  startTime: "2024-01-15T10:30:00Z",
  events: [],
};

const mockGameHistory = [
  {
    id: 1,
    name: "Friday Night Game",
    players: ["Alice", "Bob", "Charlie"],
    winner: "Alice",
    duration: "1h 23m",
    rounds: 8,
    date: "2024-01-15",
    events: [
      { round: 1, winner: "Bob", scores: { Alice: 15, Bob: 0, Charlie: 23 } },
      {
        round: 2,
        winner: "Alice",
        scores: { Alice: 15, Bob: 12, Charlie: 46 },
      },
      {
        round: 3,
        winner: "Charlie",
        scores: { Alice: 28, Bob: 12, Charlie: 46 },
      },
    ],
  },
  {
    id: 2,
    name: "Quick Match",
    players: ["Bob", "Diana"],
    winner: "Diana",
    duration: "45m",
    rounds: 5,
    date: "2024-01-14",
    events: [],
  },
];

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* Active Game Card */}
      {mockActiveGame && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">{mockActiveGame.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Round {mockActiveGame.round}
              </Badge>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{mockActiveGame.players.length} players</span>
              <span>Target: {mockActiveGame.settings.scoreToWin} pts</span>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 h-12"
                onClick={() => setCurrentView("game")}
              >
                Continue Game
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 bg-transparent"
                onClick={() => setCurrentView("viewer")}
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col gap-3 bg-white border-2 border-dashed border-gray-300 hover:border-red-300 hover:bg-red-50"
          onClick={() => setCurrentView("setup")}
        >
          <Plus className="w-8 h-8 text-red-500" />
          <span className="font-medium">New Game</span>
        </Button>
        <Button
          variant="outline"
          className="h-24 flex-col gap-3 bg-white hover:bg-blue-50"
          onClick={() => setCurrentView("players")}
        >
          <Users className="w-8 h-8 text-blue-500" />
          <span className="font-medium">Manage Players</span>
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-white hover:bg-purple-50"
          onClick={() => setCurrentView("history")}
        >
          <History className="w-6 h-6 text-purple-500" />
          <span className="font-medium">Game History</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 bg-white hover:bg-green-50"
          onClick={() => setCurrentView("analytics")}
        >
          <BarChart3 className="w-6 h-6 text-green-500" />
          <span className="font-medium">Analytics</span>
        </Button>
      </div>

      {/* Recent Games */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Games
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockGameHistory.slice(0, 3).map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded px-2"
              onClick={() => {
                setSelectedGame(game);
                setCurrentView("history");
              }}
            >
              <div>
                <p className="font-medium">{game.name}</p>
                <p className="text-sm text-gray-500">
                  {game.players.length} players • {game.duration}
                </p>
              </div>
              <div className="text-right">
                <Badge variant="outline">Completed</Badge>
                <p className="text-xs text-gray-500 mt-1">
                  Winner: {game.winner}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
