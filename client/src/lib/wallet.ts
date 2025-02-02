import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { ethers } from "ethers";

// USDC Contract ABI - Only including necessary functions
const USDC_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

// USDC contract addresses for different networks
const USDC_ADDRESSES = {
  mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  goerli: "0x07865c6e87b9f70255377e024ace6630c1eaa37f" // Testnet USDC
};

let walletProvider: ethers.providers.Web3Provider | null = null;

// Initialize Coinbase Wallet SDK
export const initializeCoinbaseWallet = (appName = "Web3 Mission: Impossible") => {
  if (walletProvider) {
    return { provider: walletProvider };
  }

  const wallet = new CoinbaseWalletSDK({
    appName,
  });

  // Initialize providers
  const ethereum = wallet.makeWeb3Provider();
  walletProvider = new ethers.providers.Web3Provider(ethereum);

  return {
    provider: walletProvider
  };
};

// Connect wallet and get accounts
export const connectWallet = async (provider: ethers.providers.Web3Provider) => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw new Error("Failed to connect wallet. Please try again.");
  }
};

// Create a new wallet for the secret drop
export const createSecretWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

// Create an escrow wallet to hold funds
export const createEscrowWallet = () => {
  return createSecretWallet();
};

// Get USDC contract instance
const getUSDCContract = (provider: ethers.providers.Web3Provider, networkName: 'mainnet' | 'goerli' = 'goerli') => {
  const signer = provider.getSigner();
  const contractAddress = USDC_ADDRESSES[networkName];
  return new ethers.Contract(contractAddress, USDC_ABI, signer);
};

// Create a new secret drop with USDC
export const createSecretDrop = async (
  provider: ethers.providers.Web3Provider,
  amount: string,
  escrowAddress: string
) => {
  if (!provider) {
    throw new Error("Wallet provider not initialized");
  }

  try {
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    if (!signerAddress) {
      throw new Error("No wallet connected");
    }

    const usdc = getUSDCContract(provider);
    const decimals = await usdc.decimals();
    const amountInSmallestUnit = ethers.utils.parseUnits(amount, decimals);

    // Transfer the tokens to the escrow wallet
    const transferTx = await usdc.transfer(escrowAddress, amountInSmallestUnit);
    const receipt = await transferTx.wait();

    return receipt;
  } catch (error: any) {
    console.error("Failed to create secret drop:", error);
    if (error.message.includes("user rejected")) {
      throw new Error("Transaction was rejected. Please try again.");
    }
    throw new Error("Failed to create secret drop. Please ensure you have sufficient USDC balance.");
  }
};

// Get USDC balance
export const getUSDCBalance = async (provider: ethers.providers.Web3Provider, address: string) => {
  try {
    const usdc = getUSDCContract(provider);
    const decimals = await usdc.decimals();
    const balance = await usdc.balanceOf(address);
    return ethers.utils.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Failed to get USDC balance:", error);
    throw error;
  }
};