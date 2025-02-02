import { useEffect, useState } from "react";
import { agents } from "@/game/agents";
import { levels } from "@/game/levels";
import { AgentDialog } from "@/components/game/AgentDialog";
import { GameHUD } from "@/components/game/GameHUD";
import { LevelProgress } from "@/components/game/LevelProgress";
import { Tutorial } from "@/components/game/Tutorial";
import { WalletConnect } from "@/components/game/WalletConnect";
import type { GameState, Level, Mission, Dialogue } from "@/game/types";
import { initializeSounds, playSound } from "@/game/sound";
import { useToast } from "@/hooks/use-toast";
import { LeaderBoard } from "@/components/game/LeaderBoard";
import { DiscussionBoard } from "@/components/game/DiscussionBoard";
import { CoinbaseFeed } from "@/components/game/CoinbaseFeed";

const initialGameState: GameState = {
  currentLevel: 1,
  experience: 0,
  achievements: [],
  completedMissions: []
};

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentLevel, setCurrentLevel] = useState<Level>(levels[0]);
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeSounds().catch(error => {
      console.error('Failed to initialize sounds:', error);
    });
  }, []);

  const handleLevelSelect = (level: Level) => {
    setCurrentLevel(level);
    if (level.missions.length > 0) {
      const mission = level.missions[0];
      setCurrentMission(mission);
      if (mission.dialogues.length > 0) {
        setCurrentDialogue(mission.dialogues[0]);
      }
    }
  };

  const handleDialogueOption = async (option: { nextDialogueId: string; isCorrect?: boolean }) => {
    if (!currentMission) return;

    try {
      if (option.isCorrect === true) {
        playSound('success');
        const xpReward = currentMission.xpReward;
        setGameState(prev => ({
          ...prev,
          experience: prev.experience + xpReward,
          completedMissions: [...prev.completedMissions, currentMission.id]
        }));

        toast({
          title: "Correct!",
          description: `Well done! You've earned ${xpReward} XP!`,
        });
      } else if (option.isCorrect === false) {
        toast({
          title: "Incorrect",
          description: "Review the explanation and try again!",
          variant: "destructive"
        });
      }

      const nextDialogue = currentMission.dialogues.find(
        d => d.id === option.nextDialogueId
      );

      if (nextDialogue) {
        setCurrentDialogue(nextDialogue);
      } else if (option.nextDialogueId === 'complete') {
        setCurrentDialogue(null);
        playSound('mission');
        toast({
          title: "Mission Complete!",
          description: `Congratulations! You've completed the ${currentMission.title} mission!`,
        });
      } else {
        setCurrentDialogue(null);
        toast({
          title: "Mission Update",
          description: "Keep going! You're making progress.",
        });
      }
    } catch (error) {
      console.error('Error handling dialogue:', error);
      toast({
        title: "Error",
        description: "Failed to process your response",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-primary/50"
            style={{
              left: '0',
              right: '0',
              top: `${i * 12.5}%`,
              transform: 'translateY(-50%)',
              animation: `scan ${2 + i}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="fixed top-4 right-4 z-20">
        <WalletConnect />
      </div>

      <Tutorial />
      <GameHUD gameState={gameState} currentLevel={currentLevel} />

      <div className="max-w-7xl mx-auto mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
          <div className="rounded-lg p-8 backdrop-blur-md bg-background/80">
            <h1 className="text-4xl font-bold text-primary mb-8">Web3 Mission</h1>

            <LevelProgress
              levels={levels}
              gameState={gameState}
              onSelectLevel={handleLevelSelect}
            />
          </div>

          <div className="lg:w-96 space-y-8">
            <LeaderBoard />
            <CoinbaseFeed />
          </div>
        </div>

        <DiscussionBoard />

        {currentDialogue && currentMission && (
          <AgentDialog
            agent={agents.find((a) => a.id === currentMission.agentId)!}
            dialogue={currentDialogue}
            onOptionSelect={handleDialogueOption}
            isOpen={!!currentDialogue}
            onClose={() => setCurrentDialogue(null)}
          />
        )}
      </div>

      <style>
        {`
          @keyframes scan {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}