import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./db/migations",
    dbCredentials: {
        database: "questkeep",
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "pass"
    }
});