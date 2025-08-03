"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Hash,
  Timer,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime, gameDuration } from "@/lib/utils";

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

export default function GameHistory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  console.log("Game ID from search params:", gameId);
  const [selectedGame, setSelectedGame] = useState(mockGameHistory[0]);
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGameHistory(gameId) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/game/history/${gameId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Game not found");
          router.replace(`/dev/auth`);
        }
        throw new Error("Network response was not ok");
      }
      const game = await response.json();
      setGame(game);
      console.log("Fetched game history:", game);
    } catch (error) {
      console.log("Error fetching game history:", error);
      toast.error("Failed to load game history");
      router.replace(`/dev/auth`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (gameId) {
      setIsLoading(true);
      fetchGameHistory(gameId);
    } else {
      toast.error("Game not found");
      router.replace(`/dev/auth`);
    }
  }, [gameId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="p-4 space-y-6">
          {/* Game Info Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Rounds Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col gap-2">
                    <div className="flex w-full items-center justify-between mb-3">
                      <Skeleton className="h-4 w-20" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-24" />
                    <div className="flex justify-between mb-2 gap-2 align-items-center md:flex-row flex-col">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-4 w-12 mb-1" />
                        <Skeleton className="h-4 w-12 mb-1" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-4 w-12 mb-1" />
                        <Skeleton className="h-4 w-12 mb-1" />
                      </div>
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-4 w-12 mb-1" />
                        <Skeleton className="h-4 w-12 mb-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dev/auth")}
            className="w-10 h-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg">Game History</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Game Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{game.game.name}</CardTitle>
            </div>
            <div className="flex md:gap-4 gap-2 text-sm text-gray-500 flex-col md:flex-row">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDateTime(game.game.start_time)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {gameDuration(game.game.start_time, game.game.end_time)}
              </span>
              <span className="flex items-center gap-1">
                <Hash className="w-4 h-4" />
                {game.matches.length} rounds
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">
                Winner{game.winners.length > 1 ? "s" : ""}:{" "}
                {game.winners.map((w) => w.name).join(", ")}
              </span>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Players</Label>
              <div className="flex gap-2">
                {game.players.map((player) => (
                  <Badge key={player.player_id} variant="outline">
                    {player.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Round by Round</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {game.matches.map((event, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={"p-0 hover:no-underline cursor-pointer"}
                    >
                      <div className="flex flex-col items-start justify-between w-full">
                        <div className="flex w-full items-center justify-between mb-3">
                          <span className="font-semibold">
                            Round {event.round}
                          </span>
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {event.player_name}
                            </span>
                          </div>
                        </div>
                        <span className="font-semibold">
                          Duration:{" "}
                          {gameDuration(
                            event.details[0].start_time,
                            event.details[0].end_time
                          )}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-3">
                        <div className="flex justify-between mb-2 gap-2 align-items-center md:flex-row flex-col">
                          <span className="font-semibold flex gap-2">
                            <Timer className="w-4 h-4 text-gray-500" />
                            Start:{" "}
                            {event.details[0].start_time
                              ? formatDateTime(event.details[0].start_time)
                              : "N/A"}
                          </span>
                          <span className="font-semibold flex gap-2">
                            <Timer className="w-4 h-4 text-gray-500" />
                            End:{" "}
                            {event.details[0].end_time
                              ? formatDateTime(event.details[0].end_time)
                              : "N/A"}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <span className="font-semibold">Player</span>
                            <ul className="mt-1 space-y-1">
                              {event.details.map((player, index) => (
                                <li
                                  key={index}
                                  className="text-gray-700 flex justify-start gap-1"
                                >
                                  {player.name}{" "}
                                  {player.is_winner && (
                                    <Crown className="w-4 h-4 text-yellow-500" />
                                  )}
                                  {player.status === "disabled" && (
                                    <span className="text-red-500">
                                      (Disabled)
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-semibold">Score</span>
                            <ul className="mt-1 space-y-1">
                              {event.details.map((player, index) => (
                                <li key={index} className="text-gray-700">
                                  {player.score_added}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-semibold">Total</span>
                            <ul className="mt-1 space-y-1">
                              {event.details.map((player, index) => (
                                <li key={index} className="text-gray-700">
                                  {player.score}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
