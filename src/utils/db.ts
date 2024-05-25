import Database from "better-sqlite3";
import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema";
import { Place, User } from "@/types";
import { Pool } from "pg";
import { PageRequest } from "@/components/DataTable";

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


//#region Places

export const getPlaces = async (request: PageRequest) : Promise<Place[]> => {
    return await db.query.places.findMany({
        offset: request.pageIndex * request.pageSize,
        limit: request.pageSize
    })
}

export const deletePlaces = async (ids: number[]) : Promise<void> => {
    await db.delete(schema.places).where(inArray(schema.places.id, ids)).returning()
}

//#endregion

//#region Quests

export const getQuests = async (request: PageRequest) : Promise<Place[]> => {
    return await db.query.quests.findMany({
        offset: request.pageIndex * request.pageSize,
        limit: request.pageSize,
        with: {
            creator: true,
            place: true
        }
    })
}

export const deleteQuests = async (ids: number[]) : Promise<void> => {
    await db.delete(schema.quests).where(inArray(schema.quests.id, ids)).returning()
}

//#endregion