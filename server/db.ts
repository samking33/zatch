import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const shouldSkipDb = process.env.SKIP_DB === "true";
if (!process.env.DATABASE_URL && !shouldSkipDb) {
  throw new Error("DATABASE_URL must be set.");
}
if (!process.env.DATABASE_URL && shouldSkipDb) {
  console.warn("DATABASE_URL not set. Using in-memory storage for /api routes.");
}

export const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/postgres",
});

export const db = drizzle(pool, { schema });
