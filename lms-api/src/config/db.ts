import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DB_URL,
});
const db = drizzle({ client: pool });

async function testDbConnection() {
    try {
        await pool.query('SELECT 1'); // Simple test query
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

testDbConnection();

export default db;
