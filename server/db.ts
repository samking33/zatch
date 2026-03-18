import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const shouldUseDatabase =
  Boolean(process.env.DATABASE_URL) && process.env.SKIP_DB !== "true";

if (!shouldUseDatabase) {
  console.warn("DATABASE_URL not set. Using in-memory storage for /api routes.");
}

export const pool = shouldUseDatabase
  ? new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    })
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;
