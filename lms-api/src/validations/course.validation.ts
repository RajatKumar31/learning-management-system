import { z } from 'zod';

export const CourseListSchema = z.object({
    category: z.optional(z.string()),
});

export const GetCourseSchema = z.object({
    courseId: z.string(),
});

export const CreateCourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    category: z.string(),
    teacherName: z.string(),
    level: z.string(),
    status: z.string(),
});
