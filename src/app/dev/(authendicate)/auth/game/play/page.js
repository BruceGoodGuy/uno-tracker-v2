"use client";
import React, {
  useState,
  useEffect,
  startTransition,
  useOptimistic,
} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthStore from "@/lib/useAuthStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ArrowLeft,
  MoreVertical,
  UserPlus,
  UserMinus,
  Edit3,
  Check,
  Trophy,
  X,
  Crown,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Clock from "@/app/components/Clock";
import { Play } from "next/font/google";
import PlayerAvatar from "@/app/components/PlayerAvatar";
import Players from "@/app/features/game/play/players";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddNewPlayer from "@/app/features/game/play/add";

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
export default function GamePlay() {
  const [editingScore, setEditingScore] = useState(null);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [gameState, setGameState] = useState(mockActiveGame);
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState({ playerList: 0 });
  const router = useRouter();

  const toggleHideDisabledPlayer = useAuthStore(
    (s) => s.toggleHideDisabledPlayer
  );
  const isHideDisabledPlayer = useAuthStore(
    (s) => s.setting.hideDisabledPlayer
  );

  async function fetchGame() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/ongoing?mode=play`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      setIsLoading(false);
      if (response.status === 404) {
        toast.error("No active game found");
        router.push("/dev/auth");
        return;
      }
      const errorData = await response.json();
      toast.error("Something went wrong: " + errorData.detail[0].msg);
      router.push("/dev/auth");
      return;
    }
    const { data } = await response.json();
    console.log("Fetched game data:", data);
    setGame(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dev/auth">
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            {isLoading && (
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-50 h-4" />
                <Skeleton className="w-50 h-3" />
              </div>
            )}
            {!isLoading && (
              <div>
                <h1 className="font-semibold text-lg">{game?.name}</h1>
                <p className="text-sm text-gray-500">
                  Round {game?.match_data ?? 1}
                  {game?.end_condition === "time" && (
                    <span>
                      {" "}
                      • Target Time Limit: {game?.time_limit} minutes
                    </span>
                  )}
                  {game?.end_condition === "score" && (
                    <span>
                      {" "}
                      • Target Score Limit: {game?.score_to_win} points
                    </span>
                  )}
                  {game?.end_condition === "rounds" && (
                    <span>
                      {" "}
                      • Target Round Limit: {game?.max_rounds} rounds
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                disabled={isLoading}
                className="w-10 h-10 bg-transparent"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[300px]">
              <SheetHeader>
                <SheetTitle>Game Options</SheetTitle>
                <SheetDescription>
                  Manage players and game settings
                </SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddPlayer(true)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Player
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("viewer")}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Public View
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleHideDisabledPlayer();
                    setReload((prev) => ({
                      ...prev,
                      playerList: prev.playerList + 1,
                    }));
                  }}
                >
                  {!isHideDisabledPlayer ? (
                    <EyeOff className="w-4 h-4 mr-2" />
                  ) : (
                    <Eye className="w-4 h-4 mr-2" />
                  )}
                  {isHideDisabledPlayer ? "Show" : "Hide"} disabled players
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Players
        gameId={game?.id}
        round={game?.match_data}
        reload={reload.playerList}
        isHideDisabledPlayer={isHideDisabledPlayer}
        onReloadPage={() => {
          startTransition(() => {
            fetchGame();
          });
        }}
      />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 bg-transparent"
            onClick={() => setCurrentView("dashboard")}
          >
            End Game
          </Button>
          <Button
            className="flex-1 h-12"
            onClick={() => setShowAddPlayer(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Player
          </Button>
        </div>
      </div>

      <AddNewPlayer
        gameId={game?.id}
        showAddPlayer={showAddPlayer}
        setShowAddPlayer={setShowAddPlayer}
        onReloadPage={() => {
          setReload((prev) => ({ ...prev, playerList: prev.playerList + 1 }));
        }}
      />
    </div>
  );
}
