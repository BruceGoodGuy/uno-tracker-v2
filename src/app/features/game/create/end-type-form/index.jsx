"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Target } from "lucide-react";
export default function EndTypeForm({ endSettings, error }) {
  // Game Settings State
  const [gameSettings, setGameSettings] = useState({
    endCondition: "score", // "score", "rounds", "time"
    scoreToWin: 500,
    maxRounds: 10,
    timeLimit: 120, // minutes
    winnerGetsAll: true,
    customPoints: 50,
  });

  return (
    <Card className={"gap-2"}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5" />
          End Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Game ends when:
          </Label>
          <Select
            defaultValue={endSettings.endCondition}
            name="endCondition"
            onValueChange={(value) =>
              setGameSettings((prev) => ({ ...prev, endCondition: value }))
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Player reaches target score</SelectItem>
              <SelectItem value="rounds">Maximum rounds completed</SelectItem>
              <SelectItem value="time">Time limit reached</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {gameSettings.endCondition === "score" && (
          <div>
            <Label className="text-sm font-medium">
              Score to Win: {gameSettings.scoreToWin}
            </Label>
            <Slider
              defaultValue={[endSettings.scoreToWin]}
              name="scoreToWin"
              onValueChange={([value]) =>
                setGameSettings((prev) => ({
                  ...prev,
                  scoreToWin: value,
                }))
              }
              max={1000}
              min={100}
              step={50}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100</span>
              <span>1000</span>
            </div>
          </div>
        )}

        {gameSettings.endCondition === "rounds" && (
          <div>
            <Label className="text-sm font-medium">
              Maximum Rounds: {gameSettings.maxRounds}
            </Label>
            <Slider
              defaultValue={[gameSettings.maxRounds]}
              name="maxRounds"
              onValueChange={([value]) =>
                setGameSettings((prev) => ({ ...prev, maxRounds: value }))
              }
              max={100}
              min={5}
              step={1}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5</span>
              <span>100</span>
            </div>
          </div>
        )}

        {gameSettings.endCondition === "time" && (
          <div>
            <Label className="text-sm font-medium">
              Time Limit: {gameSettings.timeLimit} minutes
            </Label>
            <Slider
              defaultValue={[gameSettings.timeLimit]}
              name="timeLimit"
              onValueChange={([value]) =>
                setGameSettings((prev) => ({ ...prev, timeLimit: value }))
              }
              max={300}
              min={30}
              step={15}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>30m</span>
              <span>5h</span>
            </div>
          </div>
        )}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
