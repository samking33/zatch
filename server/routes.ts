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

  app.post("/api/google-form/submit", async (req, res) => {
    try {
      const { name, contact, email, formType } = req.body;

      if (!name || !contact || !email || !formType) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const formConfigs: Record<string, { formId: string; entries: Record<string, string> }> = {
        buyer: {
          formId: "1FAIpQLSe2tTXmTnjayVcxx4FXukSoDJBEZcJQe2VcMbMq78PqEeZzRA",
          entries: {
            name: "entry.1256265853",
            contact: "entry.286212901",
            email: "entry.1533294851",
          },
        },
        seller: {
          formId: "1FAIpQLSftMpAYkGKMCmL8uo1FTTooA-w_ejrzcySRizeFan4_CCsHbg",
          entries: {
            name: "entry.1753396057",
            contact: "entry.891290933",
            email: "entry.48482020",
          },
        },
      };

      const config = formConfigs[formType];
      if (!config) {
        return res.status(400).json({ error: "Invalid form type" });
      }

      const formData = new URLSearchParams();
      formData.append(config.entries.name, name);
      formData.append(config.entries.contact, contact);
      formData.append(config.entries.email, email);

      const googleFormUrl = `https://docs.google.com/forms/d/e/${config.formId}/formResponse`;

      await fetch(googleFormUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Google Form submission error:", error);
      return res.status(500).json({ error: "Failed to submit form. Please try again." });
    }
  });

  return httpServer;
}
