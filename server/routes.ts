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

  // Each form's field map: semantic key -> { entry: Google Form entry ID, required }.
  // `fields` in the request body is a flat { key: value } object keyed the same way.
  const formConfigs: Record<
    string,
    { formId: string; fields: Record<string, { entry: string; required: boolean }> }
  > = {
    buyer: {
      formId: "1FAIpQLSe2tTXmTnjayVcxx4FXukSoDJBEZcJQe2VcMbMq78PqEeZzRA",
      fields: {
        name: { entry: "entry.1256265853", required: true },
        contact: { entry: "entry.286212901", required: true },
        email: { entry: "entry.1533294851", required: true },
      },
    },
    seller: {
      formId: "1FAIpQLSftMpAYkGKMCmL8uo1FTTooA-w_ejrzcySRizeFan4_CCsHbg",
      fields: {
        name: { entry: "entry.1753396057", required: true },
        contact: { entry: "entry.891290933", required: true },
        email: { entry: "entry.48482020", required: true },
      },
    },
    runforher: {
      formId: "1FAIpQLSekywncJ-5BVDb7e41KyTKIaUGvMRdn0WAUGnRTJIMSPZncbw",
      fields: {
        fullName: { entry: "entry.1185922731", required: true },
        email: { entry: "entry.94500262", required: true },
        whatsapp: { entry: "entry.1086757071", required: true },
        age: { entry: "entry.1992537805", required: true },
        gender: { entry: "entry.542054464", required: true },
        runCategory: { entry: "entry.368268770", required: true },
        hearAbout: { entry: "entry.809900115", required: false },
        emergencyName: { entry: "entry.848951939", required: true },
        emergencyContact: { entry: "entry.125910938", required: true },
        bloodGroup: { entry: "entry.69411840", required: false },
        medicalConditions: { entry: "entry.57754457", required: false },
        waiverAgreed: { entry: "entry.1504094604", required: true },
      },
    },
  };

  app.post("/api/google-form/submit", async (req, res) => {
    try {
      const { formType, fields } = req.body;

      const config = formConfigs[formType];
      if (!config || !fields || typeof fields !== "object") {
        return res.status(400).json({ error: "Invalid form type" });
      }

      const missing = Object.entries(config.fields)
        .filter(([key, def]) => def.required && !String(fields[key] ?? "").trim())
        .map(([key]) => key);
      if (missing.length) {
        return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
      }

      const formData = new URLSearchParams();
      for (const [key, def] of Object.entries(config.fields)) {
        const value = fields[key];
        if (value === undefined || value === null || value === "") continue;
        formData.append(def.entry, String(value));
      }

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
