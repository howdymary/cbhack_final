export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  intro: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  requiredXP: number;
  missions: Mission[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  agentId: string;
  dialogues: Dialogue[];
}

export interface Dialogue {
  id: string;
  text: string;
  options?: DialogueOption[];
}

export interface DialogueOption {
  text: string;
  nextDialogueId: string;
  isCorrect?: boolean;
}

export interface GameState {
  currentLevel: number;
  experience: number;
  achievements: Achievement[];
  completedMissions: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
}
