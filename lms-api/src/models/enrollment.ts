import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const enrollments = pgTable('enrollments', {
    courseId: varchar(),
    userId: varchar(),
    createdAt: timestamp().defaultNow(),
});
