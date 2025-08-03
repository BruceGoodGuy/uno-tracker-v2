"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { gameDuration } from "@/lib/utils";

export default function RecentGames() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentGames, setRecentGames] = useState([]);
  async function fetchRecentGames() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/recent`,
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
          return [];
        }
        throw new Error("Failed to fetch recent games");
      }
      const { games } = await response.json();
      console.log("Fetched recent games:", games);
      setRecentGames(games);
    } catch (error) {
      console.error("Failed to fetch recent games:", error);
      toast.error("Failed to fetch recent games. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchRecentGames();
  }, []);
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="w-5 h-5" />
          Recent Games
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading && (
          <>
            <div className="flex justify-between items-between gap-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-50 h-5" />
                <Skeleton className="w-50 h-3" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-25 h-5" />
                <Skeleton className="w-25 h-3" />
              </div>
            </div>
          </>
        )}
        {!isLoading &&
          recentGames.map((game) => (
            <Link
              key={game.id}
              href={`/dev/auth/game/history?gameId=${game.id}`}
            >
              <div
                key={game.id}
                className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded px-2"
              >
                <div>
                  <p className="font-medium">{game.name}</p>
                  <p className="text-sm text-gray-500">
                    {game.player_count} players •{" "}
                    {gameDuration(game.start_time, game.end_time)}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{game.status}</Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    Winner: {game.winner.map((p) => p.player_name).join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {!isLoading && recentGames.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No recent games found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
