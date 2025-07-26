import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

const mockActiveGame = {
  id: 1,
  name: "Weekend Tournament",
  status: "in_progress",
  settings: {
    endCondition: "score",
    scoreToWin: 500,
    maxRounds: 10,
    timeLimit: 120,
    winnerGetsAll: true,
    customPoints: 50,
  },
  players: [
    { id: 1, name: "Alice", score: 45, isHost: false, roundScore: 0 },
    { id: 2, name: "Bob", score: 23, isHost: true, roundScore: 0 },
    { id: 3, name: "Charlie", score: 67, isHost: false, roundScore: 0 },
  ],
  round: 3,
  startTime: "2024-01-15T10:30:00Z",
  events: [],
};

export default function ActiveGame() {
  return (
    <>
      {mockActiveGame && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">{mockActiveGame.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Round {mockActiveGame.round}
              </Badge>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{mockActiveGame.players.length} players</span>
              <span>Target: {mockActiveGame.settings.scoreToWin} pts</span>
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 h-12"
                // onClick={() => setCurrentView("game")}
              >
                Continue Game
              </Button>
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
