import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import PlayerAvatar from "@/app/components/PlayerAvatar";

export default function PlayerForm({ formAction, isPending, player }) {
  return (
    <Card className="py-0">
      <CardContent className="p-4">
        <form className="flex gap-2 relative" action={formAction}>
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderCircle className="w-6 h-6 text-dark-500 animate-spin" />
            </div>
          )}
          <PlayerAvatar
            avatar={player?.avatar}
            handleChangeAvatar={() => {
                // Handle avatar change logic here
            }}
          />
          <Input
            placeholder="Enter player name"
            className={"flex-1 h-12" + (player?.error ? " border-red-500" : "")}
            name="playerName"
            defaultValue={player?.name}
            disabled={isPending}
          />
          <Button className="h-12 px-6" disabled={isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </form>
        {player?.error && (
          <Label className="text-sm text-red-500 mt-2">{player?.error}</Label>
        )}
      </CardContent>
    </Card>
  );
}
