import Database from "better-sqlite3";
import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema";
import { Place, Quest, User } from "@/types";
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

export const getPlacesPaged = async (request: PageRequest) : Promise<Place[]> => {
    return await db.query.places.findMany({
        offset: request.pageIndex * request.pageSize,
        limit: request.pageSize
    })
}

export const getAllPlaces = async () : Promise<Place[]> => {
    return await db.query.places.findMany()
}

export const deletePlaces = async (ids: number[]) : Promise<void> => {
    await db.delete(schema.places).where(inArray(schema.places.id, ids)).returning()
}

//#endregion

//#region Quests

export const addQuest = async (name: string, description: string, placeId: number, creatorId: number) : Promise<void> => {
    await db.insert(schema.quests).values({
        name,
        description,
        placeId,
        creatorId
    }).returning()
}

export const updateQUest = async (id: number, name: string, description: string, placeId: number) : Promise<void> => {
    await db.update(schema.quests).set({
        name,
        description,
        placeId
    }).where(eq(schema.quests.id, id)).returning()
}

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

export const checkIfQuestNameIsFree = async (name: string) : Promise<boolean> => {
    const quest = await db.query.quests.findFirst({
        where: eq(schema.quests.name, name)
    })

    return quest === undefined
}

export const getQuestById = async (id: number) : Promise<Quest | undefined> => {
    return await db.query.quests.findFirst({
        where: eq(schema.quests.id, id),
        with: {
            creator: true,
            place: true
        }
    })   
}

//#endregion