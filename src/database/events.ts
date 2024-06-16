import { db } from "@/database/db"
import { events, Event } from "../../db/schema"
import { eq } from "drizzle-orm"

const createFn = (values: Omit<Event, 'id' | "eventDate">) => {
    return db.insert(events).values(values).returning()
}

const updateFn = (id: number, values: Omit<Event, 'id' | "eventDate" | "creatorId">) => {
    return db.update(events).set(values).where(eq(events.id, id)).returning()
}

const deleteFn = (id: number) => {
    return db.delete(events).where(eq(events.id, id)).returning()
}

const getEventsForUser = (userId: number) : Promise<Event[]> => {
    return db.select().from(events).where(eq(events.userId, userId))

}


export const eventTable = {
    create: createFn, 
    update: updateFn,
    delete: deleteFn
}