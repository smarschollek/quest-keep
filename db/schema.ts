import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { serial, text, integer, timestamp } from "drizzle-orm/pg-core";

//#region users

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    roles: text('role').notNull().default('user')
})

export const userRelations = relations(users, ({one, many}) => ({
    places: many(places),
    quests: many(quests),
    characters: many(characters)
}))

export type User = InferSelectModel<typeof users>

//#endregion

//#region places

export const places = pgTable('places', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    image: text('image'),
    userId: serial('user_id').references(() => users.id).notNull(),
})

export const placeRelations = relations(places, ({one, many}) => ({
    creator: one(users),
    quests: many(quests)
}))

export type Place = InferSelectModel<typeof places>

//#endregion

//#region quests
export const quests = pgTable('quests', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    image: text('image'),
    placeId: serial('place_id').references(() => places.id, {onDelete: 'cascade'}).notNull(),
    userId: serial('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
    status: integer('status').notNull().default(0)
})

export const questRelations = relations(quests, ({one}) => ({
    user: one(users, {
        fields: [quests.userId],
        references: [users.id]
    }),
    place: one(places, { 
        fields: [quests.placeId],
        references: [places.id]
    })
}))

export type Quest = InferSelectModel<typeof quests>

export type WithPlace<T> = T & {
    place: Place
}

export type WithUser<T> = T & {
    user: User
}

//#endregion

//#region characters

export const characters = pgTable('characters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    info: text('info'),
    userId: serial('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
})

export const characterRelations = relations(characters, ({one}) => ({
    user: one(users, {
        fields: [characters.userId],
        references: [users.id]
    })
}))

export type Character = InferSelectModel<typeof characters>

//#endregion

//#region events

export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    eventType: integer('event_type').notNull(),
    eventDate: timestamp('event_date').notNull().defaultNow(),
    eventData: text('event_data').notNull(),
    userId: serial('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
})

export type Event = InferSelectModel<typeof events>

//#endregion