import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./db/schema.ts",
    out: "./db/migations",
    dbCredentials: {
        url: './db/local.db'
    }
});