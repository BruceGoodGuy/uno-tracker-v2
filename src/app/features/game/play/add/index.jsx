import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlayerAvatar from "@/app/components/PlayerAvatar";
import { Plus, Minus } from "lucide-react";

export default function AddNewPlayer({
  showAddPlayer,
  setShowAddPlayer,
  gameId,
  onReloadPage,
}) {
  const addNewPlayer = () => {
    setIsLoading(true);
    if (selectedPlayer.length === 0) {
      toast.error("Please select at least one player to add");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/game/play/player/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        game_id: gameId,
        game_players: selectedPlayer,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Can't add players`);
        }
        return response.json();
      })
      .then(() => {
        toast.success("Players added successfully");
        setIsLoading(false);
        setShowAddPlayer(false);
        onReloadPage();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const [availablePlayers, setAvailablePlayers] = useState({
    data: [],
    offset: 0,
    limit: 10,
    total: 0,
  });
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAvailablePlayers = async () => {
    // Fetch available players from the backend
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/play/player/available/${gameId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("No available players found");
          return;
        }
        toast.error("Failed to fetch available players");
        return;
      }
      const { available_players } = await response.json();
      setAvailablePlayers({
        data: available_players,
        offset: 0,
        limit: 10,
        total: available_players.length,
      });
    } catch (error) {
      toast.error("Failed to fetch available players");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showAddPlayer && gameId) {
      fetchAvailablePlayers();
    }
  }, [showAddPlayer, gameId]);

  return (
    <Dialog open={showAddPlayer} onOpenChange={setShowAddPlayer}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New Player{selectedPlayer.length !== 1 && "s"}
          </DialogTitle>
          <DialogDescription>
            Select the new player to join the game
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center">
              <span className="flex justify-center items-center">
                <span className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              </span>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Available Players ({availablePlayers.total}):
              <ScrollArea className="h-[200px]">
                {availablePlayers.data.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => {
                      if (selectedPlayer.includes(player.id)) {
                        setSelectedPlayer((prev) =>
                          prev.filter((id) => id !== player.id)
                        );
                      } else {
                        setSelectedPlayer((prev) => [...prev, player.id]);
                      }
                    }}
                    className={
                      `inline-flex items-center justify-between border rounded-lg m-1 cursor-pointer hover:bg-gray-100` +
                      (selectedPlayer.includes(player.id) ? " bg-gray-200" : "")
                    }
                  >
                    <PlayerAvatar
                      name={player.name}
                      avatar={player.avatar}
                      className="w-5 h-5 m-2"
                    />
                    <span>{player.name}</span>
                    {selectedPlayer.includes(player.id) ? (
                      <Minus className="text-red-500 mr-2 text-small" />
                    ) : (
                      <Plus className="mr-2 text-green-500 text-small" />
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddPlayer(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={addNewPlayer}
              className="flex-1"
              disabled={selectedPlayer.length === 0}
            >
              Add Player{selectedPlayer.length !== 1 && "s"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
