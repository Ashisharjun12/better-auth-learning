import postgres from "postgres";
import { _config } from "./config.js";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema.js";

export const connection = postgres(_config.DATABASE_URI);
export const db = drizzle(connection, { schema }); 