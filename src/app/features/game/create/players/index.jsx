import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PlayerAvatar from "@/app/components/PlayerAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PlayerList({ selectedPlayers, setSelectedPlayers }) {
  const [playersList, setPlayersList] = useState({
    offset: 0,
    limit: 10,
    players: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function handleChangePage(direction) {
    if (direction === "prev" && playersList.offset <= 0) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/players?limit=${
          playersList.limit
        }&offset=${
          direction === "prev"
            ? playersList.offset - playersList.limit
            : playersList.offset + playersList.limit
        }`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast.error("Failed to fetch players");
      }
      const data = await response.json();
      setPlayersList({
        offset: data.offset,
        limit: data.limit,
        total: data.total,
        players: data.players,
      });
    } catch (error) {
      console.log("Error loading players:", error);
      toast("Something went wrong. Please contact support.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearchUser(query) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/game/players?limit=10&offset=0&q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast.error("Failed to fetch players");
      }
      const data = await response.json();
      setPlayersList({
        offset: data.offset,
        limit: data.limit,
        total: data.total,
        players: data.players,
      });
    } catch (error) {
      console.log("Error loading players:", error);
      toast("Something went wrong. Please contact support.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function loadPlayers() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/players?limit=10&offset=0`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast.error("Failed to fetch players");
      }
      const data = await response.json();
      setPlayersList({
        offset: data.offset,
        limit: data.limit,
        total: data.total,
        players: data.players,
      });
    } catch (error) {
      console.log("Error loading players:", error);
      toast("Something went wrong. Please contact support.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Card className={"gap-2"}>
        <CardHeader className="pb-3">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg flex gap-2 align-middle">
                <UserCheck className="w-5 h-5" />
                Available Players
              </CardTitle>
            </div>
            <Input
              className="md:w-64 w-full"
              placeholder="Search players..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // Handle search
                  handleSearchUser(e.target.value.trim());
                }
              }}
            ></Input>
          </div>
          <div className="flex md:flex-row flex-col items-start gap-2 flex-1 mt-2">
            <Label className="text-sm font-medium flex-1">
              Joined Players: {selectedPlayers.length}
            </Label>
            <div className="flex flex-wrap gap-2">
              {selectedPlayers.map((player) => (
                <Tooltip key={player.id}>
                  <TooltipTrigger asChild>
                    <Badge
                      key={player.id}
                      onClick={() =>
                        setSelectedPlayers((prev) =>
                          prev.filter((p) => p.id !== player.id)
                        )
                      }
                      className="bg-blue-100 text-blue-800 cursor-pointer h-10"
                    >
                      {player.name}
                      <X className="text-red-500" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove this player</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScrollArea className="h-[400px] md:h-auto p-0">
            {playersList.players
              .filter((p) => !selectedPlayers.find((sp) => sp.id === p.id))
              .map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 mb-3 border rounded-lg bg-white"
                >
                  <div className="flex items-center gap-3">
                    <PlayerAvatar name={player.name} avatar={player.avatar} />
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-gray-500">
                        {player.win}/{player.games_played} wins
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedPlayers((prev) => [...prev, player])
                    }
                    className="h-10 px-4"
                  >
                    Add
                  </Button>
                </div>
              ))}
            {playersList.players.length === 0 && !isLoading && (
              <div className="text-center text-gray-500">No players found.</div>
            )}
            {isLoading && (
              // Skeleton for loading state.
              <Card className={"py-0"}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 justify-start">
                    <Skeleton className="w-12 h-12" />
                    <div className="flex flex-col gap-1 h-12 flex-3">
                      <Skeleton className="h-12" />
                      <Skeleton className="h-12" />
                    </div>
                    <Skeleton className="w-5 h-12" />
                  </div>
                </CardContent>
              </Card>
            )}
          </ScrollArea>
          {`Total Players: ${playersList.total}`}
          {!isLoading && playersList?.players.length > 0 && (
            <div>
              <Pagination>
                <PaginationContent>
                  {playersList.offset > 0 && (
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => handleChangePage("prev")}
                      />
                    </PaginationItem>
                  )}
                  {playersList.total - playersList.offset >
                    playersList.limit && (
                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer"
                        onClick={() => handleChangePage("next")}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
