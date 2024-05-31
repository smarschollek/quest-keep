import { and, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../db/schema";
import { Character, Place, Quest, User } from "@/types";
import { Pool } from "pg";
import { PageRequest } from "@/components/DataTable";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const db = drizzle(pool, { schema });

export const addUser = async (user: Omit<User, 'id'>) : Promise<void> => {
    await db.insert(schema.users).values(user).returning();
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

export const addPlace = async (place: Omit<Place, 'id'>) : Promise<void> => {
    await db.insert(schema.places).values(place).returning()

}

export const updatePlace = async (id: number, place: Omit<Place, 'id' | 'creatorId'>) : Promise<void> => {
    await db.update(schema.places).set(place).where(eq(schema.places.id, id)).returning()
}

export const getPlaceById = async (id: number) : Promise<Place | undefined> => {
    return await db.query.places.findFirst({
        where: eq(schema.places.id, id)
    })
}

export const checkIfPlaceNameIsFree = async (name: string) : Promise<boolean> => {
    const place = await db.query.places.findFirst({
        where: eq(schema.places.name, name)
    })

    return place === undefined

}

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

export const addQuest = async (quest: Omit<Quest, 'id'>) : Promise<void> => {
    await db.insert(schema.quests).values(quest).returning()
}

export const updateQuest = async (id: number, quest: Omit<Quest, 'id' | 'creatorId'>) : Promise<void> => {
    await db.update(schema.quests).set(quest).where(eq(schema.quests.id, id)).returning()
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
    }) as Quest | undefined
}

//#endregion

//#region Characters

export const createCharacter = async (character : Omit<Character, 'id'>) : Promise<void> => {    
    await db.insert(schema.characters).values(character).returning()
}

export const updateCharacter = async (id: number, character: Omit<Character, 'id' | 'userId'> ) : Promise<void> => {
    await db.update(schema.characters).set(character).where(eq(schema.characters.id, id)).returning()

}

export const deleteCharacters = async (ids: number[]) : Promise<void> => {
    await db.delete(schema.characters).where(inArray(schema.characters.id, ids)).returning()
}

export const getCharactersForUser = async (userId: number) : Promise<Character[]> => {
    return await db.query.characters.findMany({
        where: eq(schema.characters.userId, userId)
    })
}

export const getCharacterById = async (id: number, userId: number) : Promise<Character | undefined> => {
    return await db.query.characters.findFirst({
        where: and(
            eq(schema.characters.id, id),
            eq(schema.characters.userId, userId),
        )
    }) 
}

//#endregion