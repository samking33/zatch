import { waitlist, type WaitlistEntry, type InsertWaitlistEntry } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  addToWaitlist(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async addToWaitlist(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const [result] = await db.insert(waitlist).values(entry).returning();
    return result;
  }

  async getWaitlistByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db.select().from(waitlist).where(eq(waitlist.email, email));
    return entry;
  }

  async getWaitlistCount(): Promise<number> {
    const result = await db.select().from(waitlist);
    return result.length;
  }
}

class MemoryStorage implements IStorage {
  private entries: WaitlistEntry[] = [];
  private nextId = 1;

  async addToWaitlist(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const newEntry: WaitlistEntry = {
      id: this.nextId++,
      email: entry.email!,
      name: entry.name ?? null,
      role: entry.role ?? "buyer",
      createdAt: new Date(),
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  async getWaitlistByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return this.entries.find((entry) => entry.email === email);
  }

  async getWaitlistCount(): Promise<number> {
    return this.entries.length;
  }
}

const useMemoryStorage = !process.env.DATABASE_URL || process.env.SKIP_DB === "true";
export const storage = useMemoryStorage ? new MemoryStorage() : new DatabaseStorage();
