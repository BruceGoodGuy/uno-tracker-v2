"use client";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const addNewPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: Date.now(),
        name: newPlayerName.trim(),
        score: 0,
        roundScore: 0,
        isHost: false,
      };
      setGameState((prev) => ({
        ...prev,
        players: [...prev.players, newPlayer],
      }));
      setNewPlayerName("");
      setShowAddPlayer(false);
    }
  };

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
        setGame(null); // No game found
        return;
      }
      const errorData = await response.json();
      toast.error("Something went wrong: " + errorData.detail);
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView("dashboard")}
              className="w-10 h-10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg">{game?.name}</h1>
              <p className="text-sm text-gray-500">
                Round 1
                {game?.end_condition === "time" && (
                  <span> • Target Time Limit: {game?.time_limit} minutes</span>
                )}
                {game?.end_condition === "score" && (
                  <span>
                    {" "}
                    • Target Score Limit: {game?.score_to_win} points
                  </span>
                )}
                {game?.end_condition === "rounds" && (
                  <span> • Target Round Limit: {game?.max_rounds} rounds</span>
                )}
              </p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {gameState.players
          .sort((a, b) => a.score - b.score)
          .map((player, index) => (
            <Card
              key={player.id}
              className={`${
                index === 0 ? "border-yellow-300 bg-yellow-50" : "bg-white"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="text-lg">
                        {player.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">
                          {player.name}
                        </span>
                        {player.isHost && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                        {index === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Leading
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">Total score</p>
                    </div>
                  </div>

                  <div className="text-right">
                    {editingScore === player.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tempScore}
                          onChange={(e) => setTempScore(e.target.value)}
                          className="w-20 h-8 text-center"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() =>
                            handleScoreEdit(
                              player.id,
                              Number.parseInt(tempScore) || 0
                            )
                          }
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => setEditingScore(null)}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold">
                          {player.score}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => {
                            setEditingScore(player.id);
                            setTempScore(player.score.toString());
                          }}
                        >
                          <Edit3 className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white font-semibold"
                    onClick={() => handleWinnerSelect(player.id)}
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Winner!
                  </Button>
                  {gameState.players.length > 2 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 text-red-500 hover:text-red-700 hover:bg-red-50 bg-transparent"
                      onClick={() => removePlayer(player.id)}
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

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

      <Dialog open={showAddPlayer} onOpenChange={setShowAddPlayer}>
        <DialogContent className="mx-4">
          <DialogHeader>
            <DialogTitle>Add New Player</DialogTitle>
            <DialogDescription>
              Enter the name of the new player to join the game
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Player name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addNewPlayer()}
              className="h-12"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddPlayer(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={addNewPlayer} className="flex-1">
                Add Player
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
