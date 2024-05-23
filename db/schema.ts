import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { serial, text } from "drizzle-orm/pg-core";

// users

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
})

export const userRelations = relations(users, ({one, many}) => ({
    places: many(places),
    quests: many(quests)
}))

// places

export const places = pgTable('places', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    image: text('image'),

})

export const placeRelations = relations(places, ({one, many}) => ({
    creator: one(users),
    quests: many(quests)
}))

// quests

export const quests = pgTable('quests', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    image: text('image'),
    placeId: serial('place_id').notNull(),
    creatorId: serial('creator_id').notNull()
})

export const questRelations = relations(quests, ({one}) => ({
    creator: one(users, {
        fields: [quests.creatorId],
        references: [users.id]
    }),
    place: one(places, { 
        fields: [quests.placeId],
        references: [places.id]
    })
}))