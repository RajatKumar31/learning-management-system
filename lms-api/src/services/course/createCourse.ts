import { z } from 'zod';
import { CreateCourseSchema } from '../../validations/course.validation';
import db from '../../config/db';
import { courses } from '../../models/course';

export const createCourseService = async (
    validatedData: z.infer<typeof CreateCourseSchema>,
) => {
    const newCourse = await db
        .insert(courses)
        .values(validatedData)
        .returning();

    return newCourse;
};
