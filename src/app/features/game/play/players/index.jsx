"use client";
import React, { useState, useEffect, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  UserMinus,
  Edit3,
  Check,
  Trophy,
  X,
  Crown,
  UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PlayerAvatar from "@/app/components/PlayerAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DisableDialog from "@/app/components/Dialog";
import { toast } from "sonner";

export default function players({
  gameId,
  onReloadPage,
  round,
  reload,
  isHideDisabledPlayer,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [pendingPlayers, setPendingPlayers] = useState([]);
  const [editingScore, setEditingScore] = useState(null);
  const [disablePlayerId, setDisablePlayerId] = useState(null);
  const [winnerId, setWinnerId] = useState(null);
  const [modalWinnerSetting, setModalWinnerSetting] = useState({
    title: "",
    description: "",
    label: { value: "", className: "" },
  });
  const [modalSetting, setModalSetting] = useState({
    title: "",
    description: "",
    label: { value: "", className: "" },
  });

  async function setDisabledPlayer() {
    if (
      players.find((p) => p.id === disablePlayerId).status === "active" &&
      players.reduce((acc, p) => acc + (p.status === "disabled" ? 1 : 0), 0) >=
        players.length - 2
    ) {
      toast.error("At least two players must remain active");
      return;
    }
    setPendingPlayers((prev) => [...prev, disablePlayerId]);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/play/player/status`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          game_id: gameId,
          player_id: disablePlayerId,
          status:
            players.find((p) => p.id === disablePlayerId).status === "active"
              ? "disabled"
              : "active",
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      toast.error("Error updating player status: " + errorData?.detail[0]?.msg);
      setPendingPlayers((prev) => prev.filter((id) => id !== disablePlayerId));
      return;
    }

    const clone_players = JSON.parse(JSON.stringify(players)).map((p) => {
      if (p.id === disablePlayerId) {
        p.status = p.status === "active" ? "disabled" : "active";
      }
      return p;
    });

    if (isHideDisabledPlayer) {
      setPlayers(clone_players.filter((p) => p.status !== "disabled"));
    } else {
      setPlayers(clone_players);
    }

    toast.success(
      `Player ${players.find((p) => p.id === disablePlayerId).name} ${
        players.find((p) => p.id === disablePlayerId).status === "active"
          ? "disabled"
          : "enabled"
      } successfully`
    );
    setPendingPlayers((prev) => prev.filter((id) => id !== disablePlayerId));
    setDisablePlayerId(null);
  }

  async function handleWinnerSelect(playerId) {
    const selectedPlayer = players.find((p) => p.id === playerId);
    if (!selectedPlayer) {
      toast.error("Player not found");
      return;
    }

    if (selectedPlayer.status === "disabled") {
      toast.error("Cannot select a disabled player as winner");
      return;
    }
    // Proceed with selecting the winner
    const description = (
      <span className="flex flex-col">
        <span>
          Are you sure you want to select <strong>{selectedPlayer.name}</strong>{" "}
          as the winner?
        </span>
        <span>
          <strong>{selectedPlayer.name}</strong> will receive a score of{" "}
          <span className="font-semibold">
            {players.reduce((acc, p) => {
              if (p.id !== playerId && p.status !== "disabled") {
                return acc + 1; // Increment the winner's score by 1
              }
              return acc;
            }, 0)}
          </span>{" "}
          for this round.
        </span>
      </span>
    );
    setModalWinnerSetting({
      title: "Confirm Winner",
      description,
      label: { value: "Confirm" },
    });

    // To open the modal :).
    setWinnerId(selectedPlayer.id);
  }

  async function updateWinner() {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/play/winner`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          game_id: gameId,
          player_id: winnerId,
        }),
      }
    );

    if (!response.ok) {
      setIsLoading(false);
      if (response.status === 404) {
        toast.error("Game not found");
        return;
      }
      const errorData = await response.json();
      toast.error("Error updating winner: " + errorData?.detail[0]?.msg);
      return;
    }

    toast.success("Winner updated successfully");
    setWinnerId(null);
    onReloadPage();
  }

  function handleTogglePlayerStatus(playerId, currentStatus) {
    if (currentStatus === "disabled") {
      setModalSetting({
        title: "Enable Player",
        description: "Are you sure you want to enable this player?",
        label: { value: "Enable Player", className: "bg-green-500 text-white" },
      });
    } else {
      setModalSetting({
        title: "Disable Player",
        description: "Are you sure you want to disable this player?",
        label: { value: "Disable Player", className: "bg-red-500 text-white" },
      });
    }
    setDisablePlayerId(playerId);
  }

  async function fetchPlayer() {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/players/${gameId}`,
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
        toast.error("No players found for this game");
        return;
      }
      const errorData = await response.json();
      console.error("Error fetching players:", errorData.detail[0].msg);
      return;
    }

    const { players: fetched_players } = await response.json();
    if (isHideDisabledPlayer) {
      setPlayers(fetched_players.filter((p) => p.status !== "disabled"));
    } else {
      setPlayers(fetched_players);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (gameId) {
      fetchPlayer();
    }
  }, [gameId, round, reload]);

  return (
    <div className="p-4 space-y-4 pb-24">
      {isLoading && (
        <>
          <Card className={`${"border-yellow-300 bg-yellow-50"}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        <Skeleton className="w-24 h-4" />
                      </span>
                      <Skeleton className="w-16 h-4" />
                    </div>
                    <Skeleton className="w-32 h-3 mt-1" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-16 h-6" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            </CardContent>
          </Card>
          <Card className={`bg-white`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        <Skeleton className="w-24 h-4" />
                      </span>
                      <Skeleton className="w-16 h-4" />
                    </div>
                    <Skeleton className="w-32 h-3 mt-1" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-16 h-6" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </>
      )}
      {!isLoading &&
        players
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <Card
              key={player.id}
              className={`${
                index === 0 ? "border-yellow-300 bg-yellow-50" : "bg-white"
              }`}
            >
              <CardContent
                className={
                  "p-4 disabled:bg-gray-100" +
                  (player.status === "disabled"
                    ? " filter-[grayscale(100%)] cursor-not-allowed"
                    : "")
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <PlayerAvatar avatar={player.avatar} name={player.name} />
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
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-2">
                              <Crown className="w-4 h-4 text-yellow-500" />{" "}
                              {player.total_win}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total Wins: {player.total_win}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {editingScore === player.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={game.score}
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
                          disabled={player.status === "disabled"}
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
                    className="flex-1 h-12 bg-green-500 disabled:bg-gray-500 hover:bg-green-600 text-white font-semibold"
                    onClick={() => handleWinnerSelect(player.id)}
                    disabled={
                      player.status === "disabled" ||
                      pendingPlayers.includes(player.id)
                    }
                  >
                    {pendingPlayers.includes(player.id) ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                        Loading...
                      </span>
                    ) : player.status === "disabled" ? (
                      "Player is disabled"
                    ) : (
                      <>
                        <Trophy className="w-5 h-5 mr-2" />
                        Win round {round}
                      </>
                    )}
                  </Button>
                  {players.length > 2 && (
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={pendingPlayers.includes(player.id)}
                      className="w-12 bg-white h-12 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                      onClick={() =>
                        handleTogglePlayerStatus(player.id, player.status)
                      }
                    >
                      <div className="flex items-center gap-2">
                        {player.status === "disabled" ? (
                          <UserPlus className="w-4 h-4 text-green-500" />
                        ) : (
                          <UserMinus className="w-4 h-4" />
                        )}
                      </div>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      <DisableDialog
        open={disablePlayerId}
        setOpen={setDisablePlayerId}
        title={modalSetting.title}
        description={modalSetting.description}
        label={modalSetting.label}
        onAccept={setDisabledPlayer}
      />

      <DisableDialog
        open={winnerId}
        setOpen={setWinnerId}
        title={modalWinnerSetting.title}
        description={modalWinnerSetting.description}
        label={modalWinnerSetting.label}
        onAccept={updateWinner}
      />
    </div>
  );
}
