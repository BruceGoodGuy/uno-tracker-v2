"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useActionState,
  useOptimistic,
  startTransition,
  useState,
  useEffect,
} from "react";
import { getDefaultGameName } from "@/lib/utils";
import { gameSchema } from "@/lib/schemas";
import GameDetailForm from "@/app/features/game/create/detail-form";
import EndTypeForm from "@/app/features/game/create/end-type-form";
import ScoringRuleForm from "@/app/features/game/create/scoring-rule";
import PlayerList from "@/app/features/game/create/players";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function newGamePage() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const router = useRouter();

  const [game, onSubmitGame, isPending] = useActionState(submitGameAction, {
    data: {
      name: getDefaultGameName(),
      endSettings: {
        endCondition: "score", // "score", "rounds", "time"
        scoreToWin: 500,
        maxRounds: 10,
        timeLimit: 120,
      },
    },
    errors: {
      name: null,
      endSettings: null,
    },
  });

  async function submitGameAction(prev, data) {
    const name = data.get("name") || getDefaultGameName();
    const endCondition = data.get("endCondition") || "score";
    const scoreToWin = parseInt(data.get("scoreToWin")) || 500;
    const maxRounds = parseInt(data.get("maxRounds")) || 10;
    const timeLimit = parseInt(data.get("timeLimit")) || 120;
    const players = selectedPlayers.map((p) => p.id);
    const endSettings = {
      endCondition,
      scoreToWin,
      maxRounds,
      timeLimit,
    };

    try {
      const validatedGame = await gameSchema.validate({
        name: name,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: validatedGame.name,
            end_condition: endCondition,
            score_to_win: scoreToWin,
            max_rounds: maxRounds,
            time_limit: timeLimit,
            game_players: players,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.detail) {
          toast.error(errorData.detail[0].msg);
          return {
            data: {
              name: validatedGame.name,
              endSettings,
            },
            errors: null,
          };
        }
      }

      router.push("/dev/auth/game/play");
      toast.success("Game created successfully!");
    } catch (error) {
      if (error.name === "ValidationError") {
        return {
          data: {
            name: validatedGame.name,
            endSettings,
          },
          errors: {
            name: error.message,
          },
        };
      }
      toast.error("Failed to create game. Please try again.");
      return {
        data: {
          name: validatedGame.name,
          endSettings,
        },
        errors: null,
      };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <form action={onSubmitGame} className="flex flex-col h-full">
        <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dev/auth" className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="w-10 h-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-semibold text-lg">New Game Setup</h1>
            </Link>
          </div>
        </div>

        <div className="p-4 space-y-6 pb-32">
          <GameDetailForm name={game.data.name} error={game.errors?.name} />
          <EndTypeForm
            endSettings={game.data.endSettings}
            error={game.errors?.endSettings}
          />

          {/* Scoring Rules */}
          <ScoringRuleForm />

          {/* Available Players */}
          <PlayerList
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
          />
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button
            type="submit"
            className="w-full h-14 text-lg"
            disabled={selectedPlayers.length < 2}
          >
            Start Game ({selectedPlayers.length} players)
          </Button>
        </div>
      </form>
    </div>
  );
}
