import type { Agent } from "./types";
import { GameAgent } from "@virtuals-protocol/game";
import { helloWorker } from "./worker";

export const getAgentState = async (): Promise<Record<string, any>> => {
  return {
    status: "active",
    expertise: "crypto",
    experience: 50,
    securityClearance: "level-5",
    catchphrase: "Knowledge is power in the Web3 world",
  };
};

export const agents: Agent[] = [
  {
    id: "mentor",
    name: "Agent Shadow",
    role: "Crypto Mentor",
    avatar: "/images/secret-agent.png",
    intro:
      "Welcome to the world of Web3, recruit. I'm Agent Shadow, and I'll be your guide through this complex digital landscape. Remember: in this world, knowledge is power, but wisdom is survival.",
  },
  {
    id: "security",
    name: "Agent Cipher",
    role: "Security Expert",
    avatar: "/images/agent-skydive.png",
    intro:
      "Security isn't just a feature in Web3 - it's a way of life. I'm Agent Cipher, and I'll teach you how to protect yourself in this digital frontier. Every key, every signature, every transaction matters.",
  },
  {
    id: "trader",
    name: "Agent Vector",
    role: "DeFi Specialist",
    avatar: "/images/skydive.png",
    intro:
      "The DeFi ecosystem is like a vast ocean of opportunities - and risks. I'm Agent Vector, your navigator through these waters. Let's explore the protocols and strategies that shape this new financial frontier.",
  },
];

// Initialize mentor agent with just the basic hello worker for now
export const mentorAgent = new GameAgent(
  "apt-b3d6724ec501257ec94c3f53de045e3d",
  {
    name: "Agent Shadow",
    goal: "Train Web3 recruits in blockchain fundamentals and security best practices",
    getAgentState: getAgentState,
    workers: [helloWorker], // Simplified to just use the hello worker
  },
);
