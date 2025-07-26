import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

const mockGameHistory = [
  {
    id: 1,
    name: "Friday Night Game",
    players: ["Alice", "Bob", "Charlie"],
    winner: "Alice",
    duration: "1h 23m",
    rounds: 8,
    date: "2024-01-15",
    events: [
      { round: 1, winner: "Bob", scores: { Alice: 15, Bob: 0, Charlie: 23 } },
      {
        round: 2,
        winner: "Alice",
        scores: { Alice: 15, Bob: 12, Charlie: 46 },
      },
      {
        round: 3,
        winner: "Charlie",
        scores: { Alice: 28, Bob: 12, Charlie: 46 },
      },
    ],
  },
  {
    id: 2,
    name: "Quick Match",
    players: ["Bob", "Diana"],
    winner: "Diana",
    duration: "45m",
    rounds: 5,
    date: "2024-01-14",
    events: [],
  },
];

export default function RecentGames() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="w-5 h-5" />
          Recent Games
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockGameHistory.slice(0, 3).map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded px-2"
            // onClick={() => {
            //   setSelectedGame(game);
            //   setCurrentView("history");
            // }}
          >
            <div>
              <p className="font-medium">{game.name}</p>
              <p className="text-sm text-gray-500">
                {game.players.length} players • {game.duration}
              </p>
            </div>
            <div className="text-right">
              <Badge variant="outline">Completed</Badge>
              <p className="text-xs text-gray-500 mt-1">
                Winner: {game.winner}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
