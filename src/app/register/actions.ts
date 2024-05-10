'use server'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { users } from '../../../db/schema';
import { hashString } from '@/helper/hashHelper';





export const register = async (username: string, email: string, password: string) => {
    const sqlite = new Database('./db/local.db');
    const db = drizzle(sqlite);
    
    const hashedPassword = await hashString(password);
    
    db.insert(users).values({
            email,
            name: username,
            password: hashedPassword
        }).run();
}