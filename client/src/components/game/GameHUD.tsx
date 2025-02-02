import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GameState, Level } from "@/game/types";

interface GameHUDProps {
  gameState: GameState;
  currentLevel: Level;
}

export function GameHUD({ gameState, currentLevel }: GameHUDProps) {
  const progress = (gameState.experience / currentLevel.requiredXP) * 250;

  return (
    <Card className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-64 p-4 bg-background/90 backdrop-blur border-primary">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Level {gameState.currentLevel}</span>
          <span className="text-primary">{currentLevel.title}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>XP: {gameState.experience}</span>
          <span>Next: {currentLevel.requiredXP}</span>
        </div>
      </div>
    </Card>
  );
}
