import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const tutorialSteps = [
  {
    title: "Welcome to Web3 Mission",
    content: "Your journey into the world of Web3 begins here. Complete missions, earn experience, and unlock new levels."
  },
  {
    title: "Meet Your Agents",
    content: "You'll work with specialized agents who will guide you through different aspects of Web3 technology."
  },
  {
    title: "Complete Missions",
    content: "Each level contains missions. Complete them to earn experience points and unlock new content."
  }
];

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const currentTutorial = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {currentTutorial.title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground">{currentTutorial.content}</p>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (isLastStep) {
                setIsOpen(false);
              } else {
                setCurrentStep((prev) => prev + 1);
              }
            }}
          >
            {isLastStep ? "Start Mission" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
