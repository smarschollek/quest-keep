import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../db/schema";

export const getUserFromDb = async (email: string) => {
    const sqlite = new Database('./db/local.db');
    const db = drizzle(sqlite, { schema });
    
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email)
    })

    return user
}