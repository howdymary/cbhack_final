import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { TransactionSuccess } from "./TransactionSuccess";
import { useState } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretMessage: string;
  amount: string;
}

export function SuccessModal({ isOpen, onClose, secretMessage, amount }: SuccessModalProps) {
  const [showCelebration, setShowCelebration] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur border-primary relative overflow-hidden">
        {showCelebration && (
          <TransactionSuccess onComplete={() => setShowCelebration(false)} />
        )}
        <div className="animate-in slide-in-from-bottom-4 duration-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Drop Created Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-primary/20">
              <p className="text-sm font-medium text-muted-foreground mb-2">Share this secret message with the recipient:</p>
              <p className="font-mono text-sm bg-background/80 p-2 rounded border border-primary/20">
                {secretMessage}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-primary/20">
              <p className="text-sm font-medium text-muted-foreground mb-2">Amount:</p>
              <p className="font-mono text-sm">
                {amount} USDC
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              The recipient can claim this drop using the secret message.
            </div>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}