import { Pool} from "pg";
import {errorMonitor} from "node:events";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
    connectionString: process.env.SUPABASE_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,

    // помогает избежать неожиданных разрывов
    keepAlive: true,
});

(async () => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT NOW()");
        client.release();
    } catch (err: unknown) {
        console.error("❌ DB connection failed:", err);
    }
})();

pool.on("error", (err) => {

    console.error("pg pool is error", err);
})