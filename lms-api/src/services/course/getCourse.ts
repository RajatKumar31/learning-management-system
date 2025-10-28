import { z } from 'zod';
import { GetCourseSchema } from '../../validations/course.validation';
import { courses } from '../../models/course';
import db from '../../config/db';
import { eq } from 'drizzle-orm';

export const getCourseService = async (
    validatedData: z.infer<typeof GetCourseSchema>,
) => {
    return await db
        .select()
        .from(courses)
        .where(eq(courses.courseId, validatedData.courseId));
};
