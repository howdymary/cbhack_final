import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  address: string;
  experience: number;
  rank: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", experience: 1250, rank: 1 },
  { address: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac", experience: 1100, rank: 2 },
  { address: "0x9876543210fedcba9876543210fedcba98765432", experience: 950, rank: 3 },
  { address: "0xabcdef0123456789abcdef0123456789abcdef01", experience: 800, rank: 4 },
  { address: "0x456789abcdef0123456789abcdef0123456789ab", experience: 750, rank: 5 }
];

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return null;
  }
}

export function LeaderBoard() {
  return (
    <Card className="w-full max-w-md bg-background/90 backdrop-blur border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top Agents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockLeaderboard.map((entry) => (
          <div
            key={entry.address}
            className="flex items-center justify-between p-3 rounded-lg border border-primary/20 bg-background/40 backdrop-blur hover:bg-background/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8">
                {getRankIcon(entry.rank) || <span className="text-muted-foreground">{entry.rank}</span>}
              </span>
              <span className="font-mono text-sm">
                {`${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
              </span>
            </div>
            <Badge variant="secondary" className="ml-2">
              {entry.experience} XP
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
