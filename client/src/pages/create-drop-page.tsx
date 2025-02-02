import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2, CreditCard } from "lucide-react";
import { createSecretDrop, createEscrowWallet } from "@/lib/wallet";
import { WalletConnect, useWalletState } from "@/components/game/WalletConnect";
import { SuccessModal } from "@/components/game/SuccessModal";

const createDropSchema = z.object({
  secretMessage: z.string().min(1, "Secret message is required"),
  tokenAmount: z.string().regex(/^\d+\.?\d*$/, "Must be a valid number").min(1, "Amount must be greater than 0"),
});

type CreateDropFormValues = z.infer<typeof createDropSchema>;

export default function CreateDropPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<{ secretMessage: string; amount: string } | null>(null);
  const { toast } = useToast();
  const { walletState } = useWalletState();

  const form = useForm<CreateDropFormValues>({
    resolver: zodResolver(createDropSchema),
    defaultValues: {
      secretMessage: "",
      tokenAmount: "",
    },
  });

  const onSubmit = async (values: CreateDropFormValues) => {
    if (!walletState.provider || !walletState.address || !walletState.isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      // Create an escrow wallet for holding the funds
      const escrowWallet = createEscrowWallet();

      // Create the drop and send funds to escrow
      await createSecretDrop(
        walletState.provider,
        values.tokenAmount,
        escrowWallet.address
      );

      // Show success modal
      setSuccessData({
        secretMessage: values.secretMessage,
        amount: values.tokenAmount
      });
      setShowSuccessModal(true);

      // Reset form
      form.reset();
    } catch (error: any) {
      console.error("Error creating drop:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create drop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
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

      <div className="max-w-xl mx-auto mt-20 relative z-10">
        <Card className="bg-background/95 backdrop-blur border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Lock className="h-5 w-5" />
              Create Secret Drop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="secretMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secret Message</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter a secret message for the recipient..."
                          className="border-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        USDC Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          placeholder="Enter amount of USDC to drop..."
                          className="border-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isCreating || !walletState.isConnected}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Drop...
                    </>
                  ) : !walletState.isConnected ? (
                    "Connect Wallet First"
                  ) : (
                    "Create Drop"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {successData && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            setSuccessData(null);
          }}
          secretMessage={successData.secretMessage}
          amount={successData.amount}
        />
      )}
    </div>
  );
}