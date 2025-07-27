"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  useActionState,
  useOptimistic,
  startTransition,
  useState,
  useEffect,
} from "react";
import { createRandomAvatar } from "@/lib/utils";
import { playerSchema } from "@/lib/schemas";
import PlayerForm from "@/app/features/player/player-form";
import PlayerAvatar from "@/app/components/PlayerAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useMediaQuery from "@/hooks/use-media-query";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Player() {
  const [playersList, setPlayersList] = useState({
    offset: 0,
    limit: 10,
    players: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [player, formAction, isPending] = useActionState(addPlayerAction, {
    name: "",
    avatar: createRandomAvatar(),
    error: null,
  });
  const [openDeletePlayer, setOpenDeletePlayer] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    loadPlayers();
  }, []);

  const [optimisticPlayers, addOptimistic] = useOptimistic(
    playersList.players,
    (current, newUser) => [...current, newUser]
  );

  const [opEditPlayer, setEditPlayer] = useState({
    playerId: null,
    name: "",
    avatar: "",
  });

  const [isEditLoading, setIsEditLoading] = useState(false);

  async function handleChangePage(direction) {
    if (direction === "prev" && playersList.offset <= 0) return;
    setIsLoading(true);
    setEditPlayer({ playerId: null, name: "", avatar: "" });
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

  async function handleUpdatePlayer() {
    if (!opEditPlayer.playerId) return;
    setIsEditLoading(true);
    try {
      const validatedPlayer = await playerSchema.validate({
        name: opEditPlayer.name,
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/player/${opEditPlayer.playerId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedPlayer.name,
            avatar: opEditPlayer.avatar,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        const detailedError = errorData.detail[0];
        console.log("Error updating player:", detailedError);
        toast.error(detailedError.msg);
        return;
      }
      await response.json();
      startTransition(() => {
        loadPlayers();
        setEditPlayer({ playerId: null, name: "", avatar: "" });
        toast.success("Player updated successfully");
      });
    } catch (error) {
      console.log("Error updating player:", error);
      toast.error("Cannot update player");
    } finally {
      setIsEditLoading(false);
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

  async function addPlayerAction(prev, formData) {
    const playerName = formData.get("playerName")?.trim() ?? "";
    const avatar = player.avatar || createRandomAvatar();
    try {
      const validatedPlayer = await playerSchema.validate({ name: playerName });
      const tempPlayer = {
        id: Math.random().toString(36).substring(2, 15),
        name: validatedPlayer.name,
        avatar,
        gamesPlayed: 0,
        wins: 0,
        totalScore: 0,
      };

      // Optimistically add the player to the list.
      addOptimistic(tempPlayer);
      let newPlayers = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/player`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedPlayer.name,
            avatar: tempPlayer.avatar,
          }),
        }
      );
      if (!newPlayers.ok) {
        const errorData = await newPlayers.json();
        const detailedError = errorData.detail[0];
        console.log("Error adding player:", detailedError);
        return { name: validatedPlayer.name, error: detailedError.msg, avatar };
      }

      await newPlayers.json();

      startTransition(() => {
        loadPlayers();
      });
      return { name: "", error: null, avatar: createRandomAvatar() };
    } catch (error) {
      console.log("Error adding player:", error);
      if (error.name === "ValidationError") {
        return { name: playerName, error: error.message, avatar };
      }
      // In case of any other error, we can log it and remove the optimistic player.
      startTransition(() => {
        setPlayersList((prev) => prev.filter((p) => p.id !== tempPlayer.id));
      });
      return {
        name: "",
        error: "Cannot add player",
        avatar: createRandomAvatar(),
      };
    }
  }

  async function handleDeletePlayer(playerId, playerName) {
    setOpenDeletePlayer({ open: true, playerId, playerName });
  }

  async function executeDeletePlayer(playerId) {
    setOpenDeletePlayer(false);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/player/${playerId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      startTransition(() => {
        loadPlayers();
      });
      toast(`Player deleted successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.log("Error deleting player:", error);
      toast("Something went wrong. Please contact support.", {
        variant: "error",
      });
    }
  }

  async function handleEditPlayer(playerId, name, avatar) {
    setEditPlayer({ playerId, name, avatar });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <Link href="/dev/auth" className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg">Manage Players</h1>
        </Link>
      </div>
      <div className="p-4 space-y-4">
        <PlayerForm
          formAction={formAction}
          isPending={isPending || isLoading}
          player={player}
        />

        <div className="space-y-3">
          {!isLoading && (
            <div className="flex w-full flex-col md:flex-row items-start md:items-center justify-between gap-2">
              <Label className="text-sm text-gray-500">
                Total players: {playersList.total || 0}
              </Label>
            </div>
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
          {!isLoading && optimisticPlayers?.length === 0 && (
            <Label className="text-sm text-gray-500 text-center flex items-center justify-center">
              No players added yet. Start by adding a player.
            </Label>
          )}
          {!isLoading && (
            <ScrollArea className="h-[400px] md:h-auto p-4 md:p-0">
              {optimisticPlayers?.map((player) => (
                <Card key={player.id} className={"py-0 mb-2"}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {opEditPlayer.playerId === player.id ? (
                          <PlayerAvatar
                            name={opEditPlayer.name}
                            avatar={opEditPlayer.avatar}
                            handleChangeAvatar={() =>
                              setEditPlayer((prev) => ({
                                ...prev,
                                avatar: createRandomAvatar(),
                              }))
                            }
                          />
                        ) : (
                          <PlayerAvatar
                            name={player.name}
                            avatar={player.avatar}
                          />
                        )}
                        <div className="px-2">
                          {opEditPlayer.playerId === player.id ? (
                            <div className="my-2">
                              <Input
                                id={`player-name-${player.id}`}
                                type={"text"}
                                name={"name"}
                                disabled={isEditLoading}
                                value={opEditPlayer.name}
                                onChange={(e) =>
                                  setEditPlayer((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUpdatePlayer();
                                  }
                                }}
                              />
                              <Button
                                className="mt-2"
                                onClick={handleUpdatePlayer}
                                disabled={isEditLoading}
                              >
                                Update
                              </Button>
                              <Button
                                variant="ghost"
                                className="mt-2 ml-2"
                                onClick={() =>
                                  setEditPlayer({
                                    playerId: null,
                                    name: "",
                                    avatar: "",
                                  })
                                }
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Label className="font-semibold">
                              {player.name}
                            </Label>
                          )}
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>
                              {player.win}/{player.games_played} wins
                            </span>
                          </div>
                        </div>
                      </div>
                      {opEditPlayer.playerId === player.id ? (
                        ""
                      ) : (
                        <Menubar>
                          <MenubarMenu>
                            <MenubarTrigger>
                              <MoreVertical className="w-4 h-4" />
                            </MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem
                                onClick={() =>
                                  handleEditPlayer(
                                    player.id,
                                    player.name,
                                    player.avatar
                                  )
                                }
                              >
                                Edit
                              </MenubarItem>
                              <MenubarSeparator />
                              <MenubarItem
                                onClick={() =>
                                  handleDeletePlayer(player.id, player.name)
                                }
                              >
                                <span className="text-red-500">Delete</span>
                              </MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          )}

          {!isLoading && optimisticPlayers?.length > 0 && (
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
        </div>
      </div>
      {!isDesktop && (
        <Drawer open={openDeletePlayer} onOpenChange={setOpenDeletePlayer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to delete player{" "}
                <span className="text-red-500 font-semibold">
                  {openDeletePlayer.playerName}
                </span>
                ?. This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="flex-1">
                <Button
                  className="bg-red-500 text-white w-full"
                  onClick={() => executeDeletePlayer(openDeletePlayer.playerId)}
                >
                  Delete player
                </Button>
              </div>
              <DrawerClose>
                <span className="text-gray-500 bg-white w-full">Cancel</span>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      {isDesktop && (
        <Dialog open={openDeletePlayer} onOpenChange={setOpenDeletePlayer}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete player</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete player{" "}
                <span className="text-red-500 font-semibold">
                  {openDeletePlayer.playerName}
                </span>
                ?. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="bg-red-500 text-white w-full"
              onClick={() => executeDeletePlayer(openDeletePlayer.playerId)}
            >
              Delete player
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
