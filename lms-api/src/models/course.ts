import {
    serial,
    pgTable,
    varchar,
    timestamp,
    integer,
} from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
    id: serial().primaryKey(),
    courseId: varchar().unique(),
    title: varchar(),
    description: varchar(),
    image: varchar(),
    price: integer(),
    category: varchar(),
    teacherName: varchar(),
    level: varchar(),
    createdAt: timestamp().defaultNow(),
});
