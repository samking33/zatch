import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = insertWaitlistSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const existing = await storage.getWaitlistByEmail(parsed.data.email!);
      if (existing) {
        return res.status(409).json({ error: "You're already on the waitlist!" });
      }

      const entry = await storage.addToWaitlist(parsed.data);
      const count = await storage.getWaitlistCount();
      return res.status(201).json({ success: true, position: count, entry });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      return res.json({ count });
    } catch (error) {
      return res.status(500).json({ error: "Failed to get count" });
    }
  });

  return httpServer;
}
