import type { Level } from './types';

export const levels: Level[] = [
  {
    id: 1,
    title: "Web3 Initiation",
    description: "Your journey into the world of Web3 begins here. Master the basics.",
    requiredXP: 0,
    missions: [
      {
        id: "m1",
        title: "Digital Identity",
        description: "Learn about wallets and digital signatures",
        xpReward: 250,
        agentId: "mentor",
        dialogues: [
          {
            id: "d1",
            text: "Welcome, recruit. Let's test your understanding of Web3 identity. First question: What is the primary purpose of a crypto wallet?",
            options: [
              {
                text: "To store your passwords and login credentials",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              },
              {
                text: "To manage your digital assets and prove your identity through cryptographic signatures",
                nextDialogueId: "d2",
                isCorrect: true
              },
              {
                text: "To browse decentralized websites",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d1_incorrect",
            text: "Not quite. A crypto wallet is your digital vault and identity combined. Let's try another approach.",
            options: [
              {
                text: "Tell me more about wallets",
                nextDialogueId: "d1_explanation"
              }
            ]
          },
          {
            id: "d1_explanation",
            text: "A crypto wallet stores your private keys and allows you to interact with blockchain networks. Think of it as your digital passport in the Web3 world.",
            options: [
              {
                text: "I understand now, let's continue",
                nextDialogueId: "d2"
              }
            ]
          },
          {
            id: "d2",
            text: "Next test: Which of these best describes a private key?",
            options: [
              {
                text: "A digital signature that expires after use",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "A recoverable password if forgotten",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "A unique cryptographic key that must never be shared",
                nextDialogueId: "d3",
                isCorrect: true
              }
            ]
          },
          {
            id: "d2_incorrect",
            text: "That's not correct. The private key is your most critical secret. It cannot be reset or recovered if lost.",
            options: [
              {
                text: "Tell me more about private keys",
                nextDialogueId: "d2_explanation"
              }
            ]
          },
          {
            id: "d2_explanation",
            text: "Your private key is the master key to your digital vault. If someone gets it, they have complete control over your assets.",
            options: [
              {
                text: "Got it, let's continue",
                nextDialogueId: "d3"
              }
            ]
          },
          {
            id: "d3",
            text: "Final test: What happens if you lose your private key?",
            options: [
              {
                text: "Contact customer service to recover it",
                nextDialogueId: "d3_incorrect",
                isCorrect: false
              },
              {
                text: "Reset it using your backup email",
                nextDialogueId: "d3_incorrect",
                isCorrect: false
              },
              {
                text: "You permanently lose access to your assets",
                nextDialogueId: "d4",
                isCorrect: true
              }
            ]
          },
          {
            id: "d3_incorrect",
            text: "Incorrect. There is no central authority to help recover lost keys. Once they're gone, they're gone forever.",
            options: [
              {
                text: "I understand the importance now",
                nextDialogueId: "d3_explanation"
              }
            ]
          },
          {
            id: "d3_explanation",
            text: "This is why secure backup of private keys and seed phrases is critical. Your security is in your hands.",
            options: [
              {
                text: "Ready for the next challenge",
                nextDialogueId: "d4"
              }
            ]
          },
          {
            id: "d4",
            text: "Excellent work! You've shown solid understanding of Web3 identity and security. Ready for your next mission?",
            options: [
              {
                text: "Yes, I'm ready for more challenges",
                nextDialogueId: "complete",
                isCorrect: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Crypto Security",
    description: "Learn essential security practices for Web3",
    requiredXP: 150,
    missions: [
      {
        id: "m2",
        title: "Security Basics",
        description: "Master fundamental security practices",
        xpReward: 250,
        agentId: "security",
        dialogues: [
          {
            id: "d1",
            text: "Agent Cipher here. Let's assess your security knowledge. What's the most secure way to store high-value crypto assets?",
            options: [
              {
                text: "In a centralized exchange",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              },
              {
                text: "In a hardware wallet (cold storage)",
                nextDialogueId: "d2",
                isCorrect: true
              },
              {
                text: "In a password-protected file",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d1_incorrect",
            text: "Wrong choice. That method leaves your assets vulnerable to attacks.",
            options: [
              {
                text: "Learn about secure storage",
                nextDialogueId: "d1_explanation"
              }
            ]
          },
          {
            id: "d1_explanation",
            text: "Hardware wallets keep your private keys offline, safe from online threats. They only connect when needed for transactions.",
            options: [
              {
                text: "Understood, continue",
                nextDialogueId: "d2"
              }
            ]
          },
          {
            id: "d2",
            text: "Before interacting with a smart contract, what should you verify first?",
            options: [
              {
                text: "Number of users",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "Source code and audit status",
                nextDialogueId: "d3",
                isCorrect: true
              },
              {
                text: "Promised returns",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d2_incorrect",
            text: "Incorrect. Popularity or promises don't guarantee security.",
            options: [
              {
                text: "Learn proper verification",
                nextDialogueId: "d2_explanation"
              }
            ]
          },
          {
            id: "d2_explanation",
            text: "Always verify smart contract code on block explorers and check for security audits. Never trust unverified contracts.",
            options: [
              {
                text: "Next security test",
                nextDialogueId: "d3"
              }
            ]
          },
          {
            id: "d3",
            text: "You receive an urgent message to connect your wallet for a surprise reward. What do you do?",
            options: [
              {
                text: "Connect immediately",
                nextDialogueId: "d3_incorrect",
                isCorrect: false
              },
              {
                text: "Share with friends to verify",
                nextDialogueId: "d3_incorrect",
                isCorrect: false
              },
              {
                text: "Ignore and report as potential scam",
                nextDialogueId: "d4",
                isCorrect: true
              }
            ]
          },
          {
            id: "d3_incorrect",
            text: "Wrong! Urgency and unexpected rewards are classic scam tactics.",
            options: [
              {
                text: "Learn about scam prevention",
                nextDialogueId: "d3_explanation"
              }
            ]
          },
          {
            id: "d3_explanation",
            text: "Legitimate projects don't use urgency or surprise rewards. These are red flags for phishing attempts.",
            options: [
              {
                text: "Ready for final assessment",
                nextDialogueId: "d4"
              }
            ]
          },
          {
            id: "d4",
            text: "Well done! You've mastered the core security protocols. Ready for advanced challenges?",
            options: [
              {
                text: "Yes, ready for advanced training",
                nextDialogueId: "complete",
                isCorrect: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "DAO Fundamentals",
    description: "Master the basics of decentralized autonomous organizations",
    requiredXP: 400,
    missions: [
      {
        id: "m3",
        title: "DAO Basics",
        description: "Learn about governance and decision-making in DAOs",
        xpReward: 300,
        agentId: "mentor",
        dialogues: [
          {
            id: "d1",
            text: "Welcome to DAO training. First question: What is the primary purpose of a decentralized autonomous organization (DAO)?",
            options: [
              {
                text: "To automate all business processes",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              },
              {
                text: "To enable collective governance and decision-making",
                nextDialogueId: "d2",
                isCorrect: true
              },
              {
                text: "To eliminate the need for smart contracts",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d1_incorrect",
            text: "Not quite. DAOs are focused on decentralized governance and collective decision-making.",
            options: [
              {
                text: "Tell me more about DAOs",
                nextDialogueId: "d1_explanation"
              }
            ]
          },
          {
            id: "d1_explanation",
            text: "DAOs use smart contracts to enforce rules and execute decisions made by their members through voting mechanisms.",
            options: [
              {
                text: "I understand now",
                nextDialogueId: "d2"
              }
            ]
          },
          {
            id: "d2",
            text: "What is governance in a DAO?",
            options: [
              {
                text: "A centralized management team",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "Automated decision-making without human input",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "The process of members voting on proposals and changes",
                nextDialogueId: "d3",
                isCorrect: true
              }
            ]
          },
          {
            id: "d2_incorrect",
            text: "Not exactly. Governance in a DAO involves members actively participating in decision-making through voting.",
            options: [
              {
                text: "Learn about DAO governance",
                nextDialogueId: "d2_explanation"
              }
            ]
          },
          {
            id: "d2_explanation",
            text: "DAO governance allows token holders to propose and vote on changes, ensuring decisions are made collectively.",
            options: [
              {
                text: "Got it, continue",
                nextDialogueId: "d3"
              }
            ]
          },
          {
            id: "d3",
            text: "Excellent! Now let's examine a real DAO proposal from Aave.",
            options: [
              {
                text: "Let's analyze the proposal",
                nextDialogueId: "d4",
                isCorrect: true
              }
            ]
          },
          {
            id: "d4",
            text: "Chaos Labs proposed increasing supply caps on Aave V3. What was the main reason for this proposal?",
            options: [
              {
                text: "To decrease protocol security",
                nextDialogueId: "d4_incorrect",
                isCorrect: false
              },
              {
                text: "To optimize capital efficiency while maintaining safety",
                nextDialogueId: "d5",
                isCorrect: true
              },
              {
                text: "To completely remove supply caps",
                nextDialogueId: "d4_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d4_incorrect",
            text: "Not quite. The proposal aims to optimize capital efficiency while maintaining strong risk management practices.",
            options: [
              {
                text: "Let me try again",
                nextDialogueId: "d4"
              }
            ]
          },
          {
            id: "d5",
            text: "Correct! What specific change did Chaos Labs propose for wstETH on Ethereum V3?",
            options: [
              {
                text: "Decrease supply cap to 100k",
                nextDialogueId: "d5_incorrect",
                isCorrect: false
              },
              {
                text: "Increase supply cap to 400k",
                nextDialogueId: "complete",
                isCorrect: true
              },
              {
                text: "Remove supply cap entirely",
                nextDialogueId: "d5_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d5_incorrect",
            text: "Incorrect. Chaos Labs proposed increasing wstETH supply cap to 400k on Ethereum V3.",
            options: [
              {
                text: "Got it, let's continue",
                nextDialogueId: "complete"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "DeFi Masterclass - AAVE",
    description: "Learn about lending, borrowing and liquidity pools with AAVE",
    requiredXP: 250,
    missions: [
      {
        id: "m4",
        title: "AAVE Protocol",
        description: "Master DeFi concepts using AAVE protocol",
        xpReward: 400,
        agentId: "trader",
        dialogues: [
          {
            id: "d1",
            text: "Welcome to AAVE training. First question: What is a liquidity pool in DeFi?",
            options: [
              {
                text: "A centralized exchange for trading",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              },
              {
                text: "A smart contract holding token pairs for trading and lending",
                nextDialogueId: "d2",
                isCorrect: true
              },
              {
                text: "A wallet for storing cryptocurrencies",
                nextDialogueId: "d1_incorrect",
                isCorrect: false
              }
            ]
          },
          {
            id: "d1_incorrect",
            text: "Not quite. Liquidity pools are smart contracts that hold pairs of tokens to enable trading and lending.",
            options: [
              {
                text: "Tell me more about liquidity pools",
                nextDialogueId: "d1_explanation"
              }
            ]
          },
          {
            id: "d1_explanation",
            text: "Liquidity pools enable automated market making and lending by using mathematical formulas to determine prices and interest rates.",
            options: [
              {
                text: "I understand now",
                nextDialogueId: "d2"
              }
            ]
          },
          {
            id: "d2",
            text: "What is the main purpose of AAVE protocol?",
            options: [
              {
                text: "Only for token swaps",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "Only for governance",
                nextDialogueId: "d2_incorrect",
                isCorrect: false
              },
              {
                text: "Decentralized lending and borrowing",
                nextDialogueId: "d3",
                isCorrect: true
              }
            ]
          },
          {
            id: "d2_incorrect",
            text: "Not exactly. AAVE is primarily a lending protocol that allows users to lend and borrow cryptocurrencies.",
            options: [
              {
                text: "Learn about AAVE lending",
                nextDialogueId: "d2_explanation"
              }
            ]
          },
          {
            id: "d2_explanation",
            text: "AAVE lets users deposit assets to earn interest and borrow other assets by using their deposits as collateral.",
            options: [
              {
                text: "Got it, continue",
                nextDialogueId: "d3"
              }
            ]
          },
          {
            id: "d3",
            text: "Now, let's explore real AAVE lending opportunities across different chains. Where does USDC have the highest supply APY?",
            options: [
              {
                text: "Let's check the rates",
                nextDialogueId: "d4",
                isCorrect: true
              }
            ]
          },
          {
            id: "d4",
            text: "AAVE V3 USDC Supply APY:\n\nEthereum: 4.12%\nArbitrum: 3.89%\nBase: 4.85%\n\nWant to provide liquidity to the Base pool for the highest yield?",
            options: [
              {
                text: "Provide Liquidity",
                nextDialogueId: "complete",
                isCorrect: true,
                action: "PROVIDE_LIQUIDITY"
              },
              {
                text: "I'll explore later",
                nextDialogueId: "complete",
                isCorrect: true
              }
            ]
          }
        ]
      }
    ]
  }
];