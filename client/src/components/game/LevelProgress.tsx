import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lock } from "lucide-react";
import type { Level, GameState } from "@/game/types";

interface LevelProgressProps {
  levels: Level[];
  gameState: GameState;
  onSelectLevel: (level: Level) => void;
}

export function LevelProgress({ levels, gameState, onSelectLevel }: LevelProgressProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
      {levels.map((level) => {
        const isUnlocked = gameState.experience >= level.requiredXP;
        const isCompleted = level.id < gameState.currentLevel;

        return (
          <Card
            key={level.id}
            className={`relative transition-transform ${
              isUnlocked ? "hover:scale-105 cursor-pointer" : "opacity-75"
            }`}
            onClick={() => isUnlocked && onSelectLevel(level)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{level.title}</h3>
                  <p className="text-sm text-white mt-1">
                    {level.description}
                  </p>
                </div>
                {isCompleted ? (
                  <CheckCircle2 className="text-green-500" />
                ) : !isUnlocked ? (
                  <Lock className="text-white" />
                ) : null}
              </div>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline" className="text-white hover:text-white">Level {level.id}</Badge>
                <Badge variant="secondary" className="text-white hover:text-white">{level.requiredXP} XP Required</Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}