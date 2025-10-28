import { serial, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial().primaryKey(),
    first_name: varchar(),
    last_name: varchar(),
    email: varchar().unique(),
    phoneNumber: varchar().unique(),
    createdAt: timestamp().defaultNow(),
});
