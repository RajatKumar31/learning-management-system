import { z } from 'zod';
import { CourseListSchema } from '../../validations/course.validation';
import db from '../../config/db';
import { courses } from '../../models/course';
import { eq } from 'drizzle-orm';

export const courseListService = async (
    validatedData: z.infer<typeof CourseListSchema>,
) => {
    const { category } = validatedData;
    if (!category || category === 'all') {
        return await db.select().from(courses);
    }
    return await db
        .select()
        .from(courses)
        .where(eq(courses.category, category));
};
