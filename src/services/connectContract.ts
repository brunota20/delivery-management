import { contractAbi } from "@/config/contractAbi";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const RPC = process.env.NEXT_PUBLIC_PONDER_RPC_URL;
const SIGNER = process.env.NEXT_PUBLIC_PRIVATE_KEY;

export const connectToContract = async () => {
  if (!CONTRACT_ADDRESS || !RPC) {
    throw new Error("Contract address or RPC URL is missing in environment variables.");
  }

  if (!SIGNER) {
    throw new Error("Private key is missing in environment variables.");
  }

  const provider = new ethers.JsonRpcProvider(RPC);
  const signer = new ethers.Wallet(SIGNER, provider);

  return new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
};
