import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { progress } from "@db/schema";
import { eq } from "drizzle-orm";
import { getAgentDialogue } from "./game";

export function registerRoutes(app: Express): Server {
  // Game progress endpoints
  app.get("/api/progress/:userId", async (req, res) => {
    const { userId } = req.params;
    const userProgress = await db.query.progress.findFirst({
      where: eq(progress.userId, parseInt(userId)),
    });
    res.json(userProgress);
  });

  app.post("/api/progress", async (req, res) => {
    const { userId, level, experience, achievements, completedMissions } = req.body;
    const newProgress = await db
      .insert(progress)
      .values({
        userId,
        level,
        experience,
        achievements,
        completedMissions,
      })
      .returning();
    res.json(newProgress[0]);
  });

  app.patch("/api/progress/:userId", async (req, res) => {
    const { userId } = req.params;
    const { level, experience, achievements, completedMissions } = req.body;
    const updated = await db
      .update(progress)
      .set({
        level,
        experience,
        achievements,
        completedMissions,
      })
      .where(eq(progress.userId, parseInt(userId)))
      .returning();
    res.json(updated[0]);
  });

  // Agent dialogue endpoint
  app.post("/api/agent/dialogue", async (req, res) => {
    try {
      const { agentRole, context, userInput } = req.body;
      const response = await getAgentDialogue(agentRole, context, userInput);
      res.json({ response });
    } catch (error) {
      console.error("Agent dialogue error:", error);
      res.status(500).json({ error: "Failed to generate agent response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}