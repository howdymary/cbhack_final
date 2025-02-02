import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { initializeCoinbaseWallet, connectWallet } from "@/lib/wallet";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wallet } from "lucide-react";

interface WalletState {
  address: string | null;
  provider: ethers.providers.Web3Provider | null;
  isConnected: boolean;
}

// Create a shared wallet state
export const useWalletState = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    provider: null,
    isConnected: false
  });

  useEffect(() => {
    const initWallet = async () => {
      const { provider } = initializeCoinbaseWallet();

      try {
        // Check if there's a previously connected account
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletState({
            provider,
            address: accounts[0],
            isConnected: true
          });
        } else {
          setWalletState(prev => ({ ...prev, provider }));
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setWalletState(prev => ({ ...prev, provider }));
      }
    };

    initWallet();
  }, []);

  return { walletState, setWalletState };
};

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { walletState, setWalletState } = useWalletState();
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!walletState.provider) {
      toast({
        title: "Error",
        description: "Wallet provider not initialized. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      const address = await connectWallet(walletState.provider);
      setWalletState(prev => ({ 
        ...prev, 
        address,
        isConnected: true 
      }));

      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
      setWalletState(prev => ({
        ...prev,
        isConnected: false,
        address: null
      }));
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleConnect}
      disabled={isConnecting || walletState.isConnected}
    >
      {isConnecting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="h-4 w-4" />
      )}
      {walletState.address ? (
        <span>{`${walletState.address.slice(0, 6)}...${walletState.address.slice(-4)}`}</span>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
}