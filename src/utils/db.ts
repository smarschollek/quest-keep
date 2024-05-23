import Database from "better-sqlite3";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../db/schema";
import { User } from "@/types";

export const addUser = async (username: string, email: string, password: string) : Promise<void> => {
    const sqlite = new Database('./db/local.db');
    const db = drizzle(sqlite, { schema });
    
    db.insert(schema.users).values({
            email: email,
            name: username,
            password: password
        }).run();
}

export const checkIfEmailIsFree = async (email: string) : Promise<boolean> => {
    const user = await getUserFromDb(email)
    return user === undefined
}

export const checkIfUsernameIsFree = async (username: string) : Promise<boolean> => {
    const sqlite = new Database('./db/local.db');
    const db = drizzle(sqlite, { schema });
    
    const user = await db.query.users.findFirst({
        where: eq(schema.users.name, username)
    })

    return user === undefined
}

export const getUserFromDb = async (email: string) : Promise<User | undefined> => {
    const sqlite = new Database('./db/local.db');
    const db = drizzle(sqlite, { schema });
    
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email)
    })

    return user
}