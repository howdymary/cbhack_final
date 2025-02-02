import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createSecretWallet } from "@/lib/wallet";

interface SecretMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecretMessageModal({ isOpen, onClose }: SecretMessageModalProps) {
  const [secretMessage, setSecretMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Verify secret message against stored secrets in the backend
      // For now, create a new wallet for testing
      const newWallet = createSecretWallet();

      toast({
        title: "Drop Claimed Successfully!",
        description: `A new wallet has been created for you. Save these details:\nAddress: ${newWallet.address}\nPrivate Key: ${newWallet.privateKey}`,
        duration: 10000,
      });

      setSecretMessage("");
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to claim drop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur border-primary">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Lock className="h-5 w-5" />
            Enter Secret Message
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter the secret message to claim your drop..."
            value={secretMessage}
            onChange={(e) => setSecretMessage(e.target.value)}
            className="border-primary/20"
            disabled={isProcessing}
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Claiming Drop...
              </>
            ) : (
              "Claim Drop"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}