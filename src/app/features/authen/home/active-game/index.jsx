"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ActiveGame() {
  const [activeGame, setActiveGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchActiveGame() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/ongoing`,
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
        return null; // No active game found
      }
      const errorData = await response.json();
      toast.error("Something went wrong: " + errorData.detail);
      return null;
    }
    const { data } = await response.json();
    setActiveGame(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchActiveGame();
  }, []);
  return (
    <>
      {isLoading && (
        <span className="text-gray-500">Loading active game...</span>
      )}
      {activeGame && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">{activeGame.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Round 3
              </Badge>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{activeGame.total_players} players</span>
              {activeGame.end_condition === "score" && (
                <span>Target: {activeGame.score_to_win} pts</span>
              )}
              {activeGame.end_condition === "time" && (
                <span>Target: {activeGame.time_limit} minutes</span>
              )}
              {activeGame.end_condition === "rounds" && (
                <span>Target: {activeGame.max_rounds} rounds</span>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/dev/auth/game/play`} className="flex-1 h-12">
                <Button className="flex-1 h-12">Continue Game</Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 bg-transparent"
                // onClick={() => setCurrentView("viewer")}
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
