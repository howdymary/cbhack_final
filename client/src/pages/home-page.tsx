import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { SecretMessageModal } from "@/components/game/SecretMessageModal";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSecretSubmit = (message: string) => {
    // TODO: Handle secret message submission
    toast({
      title: "Processing...",
      description: "Verifying your secret message...",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated tech lines in background */}
      <div className="absolute inset-0 opacity-20">
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

      <div className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-12 p-8 rounded-lg content-overlay">
          <h1 className="text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent 
              animate-pulse">Welcome to Web3: An Autonomous Onboarding Academy</span>
          </h1>

          <div className="flex flex-col items-center gap-8">
            <Button 
              size="lg" 
              className="text-xl py-8 px-12 bg-primary/90 hover:bg-primary backdrop-blur-sm transform hover:scale-105 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Claim Drop
            </Button>

            <div className="flex gap-4">
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-primary hover:bg-primary/10 backdrop-blur-sm"
              >
                <Link href="/game">
                  Agent Training
                </Link>
              </Button>

              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-primary hover:bg-primary/10 backdrop-blur-sm"
              >
                <Link href="/create">
                  Create Secret Drop
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SecretMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSecretSubmit}
      />

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