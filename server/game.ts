import { db } from "@db";
import { progress } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { generateAgentResponse } from "./ai";

export async function handleMissionCompletion(
  userId: number,
  missionId: string,
  currentExperience: number,
  xpReward: number
) {
  const newExperience = currentExperience + xpReward;

  const [updated] = await db
    .update(progress)
    .set({
      experience: newExperience,
      completedMissions: sql`array_append(${progress.completedMissions}, ${missionId})`
    })
    .where(eq(progress.userId, userId))
    .returning();

  return updated;
}

export async function getAgentDialogue(
  agentRole: string,
  context: string,
  userInput: string
) {
  return await generateAgentResponse(agentRole, context, userInput);
}