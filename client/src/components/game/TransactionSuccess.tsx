import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from "@/game/sound";

interface TransactionSuccessProps {
  onComplete?: () => void;
}

export function TransactionSuccess({ onComplete }: TransactionSuccessProps) {
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    // Play celebration sound
    playSound('success');

    const runAnimation = () => {
      const particleCount = 50;
      const spread = 70;
      const startVelocity = 30;
      const colors = ['#FFD700', '#FFA500', '#4CAF50', '#2196F3'];

      // Create confetti from multiple angles for a more dramatic effect
      const makeShot = (angle: number, origin: { x: number; y: number }) => {
        confetti({
          particleCount,
          angle,
          spread,
          startVelocity,
          colors,
          origin,
          gravity: 0.8,
          scalar: 1.2,
          drift: 0,
          ticks: 100
        });
      };

      // Shoot confetti from both corners
      makeShot(60, { x: 0, y: 0.8 });
      makeShot(120, { x: 1, y: 0.8 });

      // Add some sparkles from the top
      confetti({
        particleCount: 25,
        spread: 360,
        startVelocity: 45,
        colors,
        origin: { x: 0.5, y: 0.4 }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(runAnimation);
      } else if (onComplete) {
        onComplete();
      }
    };

    runAnimation();

    return () => {
      confetti.reset();
    };
  }, [onComplete]);

  return null; // This component only handles effects, no visual elements needed
}