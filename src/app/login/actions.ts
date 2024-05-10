"use server"
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../../db/schema";
import { eq } from "drizzle-orm";
import { compareHash } from "@/helper/hashHelper";


export const login = async (email: string, password: string) : Promise<boolean> => {
    const sqlite = new Database('./db/local.db');
    const db = drizzle(sqlite, { schema });
    
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email)
    })

    console.log(user)

    if(user) {
        const isPasswordHashValid = await compareHash(password, user.password!)
        return isPasswordHashValid
    }

    return false
}