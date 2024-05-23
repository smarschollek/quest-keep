import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema";
import { User } from "@/types";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const db = drizzle(pool, { schema });

export const addUser = async (username: string, email: string, password: string) : Promise<void> => {
    await db.insert(schema.users).values({
            email: email,
            name: username,
            password: password
        }).returning();
}

export const checkIfEmailIsFree = async (email: string) : Promise<boolean> => {
    const user = await getUserFromDb(email)
    return user === undefined
}

export const checkIfUsernameIsFree = async (username: string) : Promise<boolean> => {
    const user = await db.query.users.findFirst({
        where: eq(schema.users.name, username)
    })

    return user === undefined
}

export const getUserFromDb = async (email: string) : Promise<User | undefined> => {
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email)
    })

    return user
}