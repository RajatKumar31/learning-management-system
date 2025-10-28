import { Router } from 'express';
import expressAsyncHandler from '../utils/expressAsyncHandler';
import {
    CourseListSchema,
    GetCourseSchema,
    CreateCourseSchema,
} from '../validations/course.validation';
import {
    courseListService,
    getCourseService,
    createCourseService,
} from '../services/course';
import { StatusCodes } from 'http-status-codes';

const courseRouter = Router();

// list courses
courseRouter.get(
    '/',
    expressAsyncHandler(
        async (validatedData, req, res) => {
            const data = await courseListService(validatedData);
            const ans: any[] = [];
            const sections = [
                {
                    sectionId: '2f9d1e8b-5a3c-4b7f-9e6d-8c2a1f0b3d5e',
                    sectionTitle: 'Getting Started',
                    sectionDescription:
                        'Learn the basics of programming and set up your development environment.',
                    chapters: [
                        {
                            chapterId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
                            type: 'Video',
                            title: 'Welcome to Programming',
                            content: 'https://example.com/videos/welcome.mp4',
                            video: 'https://example.com/videos/welcome.mp4',
                            comments: [
                                {
                                    commentId:
                                        '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
                                    userId: 'emma.wilson@hotmail.com',
                                    text: 'Great introduction!',
                                    timestamp: '2023-03-10T09:15:00Z',
                                },
                            ],
                        },
                        {
                            chapterId: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
                            type: 'Text',
                            title: 'What is Programming?',
                            content:
                                'Programming is the process of creating instructions for computers to follow...',
                            comments: [],
                        },
                        {
                            chapterId: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8',
                            type: 'Quiz',
                            title: 'Programming Basics Quiz',
                            content:
                                '1. What is a variable?\n2. What is the difference between a compiler and an interpreter?\n3. Name three popular programming languages.',
                            comments: [],
                        },
                    ],
                },
                {
                    sectionId: '3g0e2f9c-6d4e-5a7f-8b9g-1h2i3j4k5l6m',
                    sectionTitle: 'Basic Programming Concepts',
                    sectionDescription:
                        'Explore fundamental programming concepts and data types.',
                    chapters: [
                        {
                            chapterId: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
                            type: 'Video',
                            title: 'Variables and Data Types',
                            content:
                                'https://example.com/videos/variables-data-types.mp4',
                            video: 'https://example.com/videos/variables-data-types.mp4',
                            comments: [],
                        },
                        {
                            chapterId: 'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0',
                            type: 'Text',
                            title: 'Control Structures',
                            content:
                                'Control structures are fundamental elements in programming that allow you to control the flow of your program...',
                            comments: [],
                        },
                        {
                            chapterId: 'f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1',
                            type: 'Quiz',
                            title: 'Control Structures Quiz',
                            content:
                                '1. What is an if-else statement?\n2. Explain the purpose of a loop.\n3. What is a switch statement?',
                            comments: [],
                        },
                    ],
                },
                {
                    sectionId: '4h1f3g0d-7e5f-6b8g-9c0h-2i3j4k5l6m7n',
                    sectionTitle: 'Functions and Modules',
                    sectionDescription:
                        'Learn how to organize your code using functions and modules.',
                    chapters: [
                        {
                            chapterId: 'g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2',
                            type: 'Video',
                            title: 'Introduction to Functions',
                            content:
                                'https://example.com/videos/intro-to-functions.mp4',
                            video: 'https://example.com/videos/intro-to-functions.mp4',
                            comments: [],
                        },
                        {
                            chapterId: 'h8i9j0k1-l2m3-n4o5-p6q7-r8s9t0u1v2w3',
                            type: 'Text',
                            title: 'Creating and Using Modules',
                            content:
                                'Modules are a way to organize and reuse code across different parts of your program...',
                            comments: [],
                        },
                        {
                            chapterId: 'i9j0k1l2-m3n4-o5p6-q7r8-s9t0u1v2w3x4',
                            type: 'Quiz',
                            title: 'Functions and Modules Quiz',
                            content:
                                "1. What is the difference between a function and a method?\n2. How do you import a module in Python?\n3. What is the purpose of the 'return' statement in a function?",
                            comments: [],
                        },
                    ],
                },
            ];
            data.forEach((course) => {
                ans.push({ ...course, sections });
            });
            return res
                .status(StatusCodes.OK)
                .json({ success: true, data: ans });
        },
        {
            validationSchema: CourseListSchema,
            getValue: (req) => ({ category: req.query.category }),
        },
    ),
);

// get a course
courseRouter.get(
    '/:courseId',
    expressAsyncHandler(
        async (validatedData, req, res) => {
            const data = await getCourseService(validatedData);
            return res.status(StatusCodes.OK).json({
                success: true,
                data: {
                    ...data,
                    sections: [
                        {
                            sectionId: '2f9d1e8b-5a3c-4b7f-9e6d-8c2a1f0b3d5e',
                            sectionTitle: 'Getting Started',
                            sectionDescription:
                                'Learn the basics of programming and set up your development environment.',
                            chapters: [
                                {
                                    chapterId:
                                        'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
                                    type: 'Video',
                                    title: 'Welcome to Programming',
                                    content:
                                        'https://example.com/videos/welcome.mp4',
                                    video: 'https://example.com/videos/welcome.mp4',
                                    comments: [
                                        {
                                            commentId:
                                                '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
                                            userId: 'emma.wilson@hotmail.com',
                                            text: 'Great introduction!',
                                            timestamp: '2023-03-10T09:15:00Z',
                                        },
                                    ],
                                },
                                {
                                    chapterId:
                                        'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
                                    type: 'Text',
                                    title: 'What is Programming?',
                                    content:
                                        'Programming is the process of creating instructions for computers to follow...',
                                    comments: [],
                                },
                                {
                                    chapterId:
                                        'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8',
                                    type: 'Quiz',
                                    title: 'Programming Basics Quiz',
                                    content:
                                        '1. What is a variable?\n2. What is the difference between a compiler and an interpreter?\n3. Name three popular programming languages.',
                                    comments: [],
                                },
                            ],
                        },
                        {
                            sectionId: '3g0e2f9c-6d4e-5a7f-8b9g-1h2i3j4k5l6m',
                            sectionTitle: 'Basic Programming Concepts',
                            sectionDescription:
                                'Explore fundamental programming concepts and data types.',
                            chapters: [
                                {
                                    chapterId:
                                        'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
                                    type: 'Video',
                                    title: 'Variables and Data Types',
                                    content:
                                        'https://example.com/videos/variables-data-types.mp4',
                                    video: 'https://example.com/videos/variables-data-types.mp4',
                                    comments: [],
                                },
                                {
                                    chapterId:
                                        'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0',
                                    type: 'Text',
                                    title: 'Control Structures',
                                    content:
                                        'Control structures are fundamental elements in programming that allow you to control the flow of your program...',
                                    comments: [],
                                },
                                {
                                    chapterId:
                                        'f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1',
                                    type: 'Quiz',
                                    title: 'Control Structures Quiz',
                                    content:
                                        '1. What is an if-else statement?\n2. Explain the purpose of a loop.\n3. What is a switch statement?',
                                    comments: [],
                                },
                            ],
                        },
                        {
                            sectionId: '4h1f3g0d-7e5f-6b8g-9c0h-2i3j4k5l6m7n',
                            sectionTitle: 'Functions and Modules',
                            sectionDescription:
                                'Learn how to organize your code using functions and modules.',
                            chapters: [
                                {
                                    chapterId:
                                        'g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2',
                                    type: 'Video',
                                    title: 'Introduction to Functions',
                                    content:
                                        'https://example.com/videos/intro-to-functions.mp4',
                                    video: 'https://example.com/videos/intro-to-functions.mp4',
                                    comments: [],
                                },
                                {
                                    chapterId:
                                        'h8i9j0k1-l2m3-n4o5-p6q7-r8s9t0u1v2w3',
                                    type: 'Text',
                                    title: 'Creating and Using Modules',
                                    content:
                                        'Modules are a way to organize and reuse code across different parts of your program...',
                                    comments: [],
                                },
                                {
                                    chapterId:
                                        'i9j0k1l2-m3n4-o5p6-q7r8-s9t0u1v2w3x4',
                                    type: 'Quiz',
                                    title: 'Functions and Modules Quiz',
                                    content:
                                        "1. What is the difference between a function and a method?\n2. How do you import a module in Python?\n3. What is the purpose of the 'return' statement in a function?",
                                    comments: [],
                                },
                            ],
                        },
                    ],
                },
            });
        },
        {
            validationSchema: GetCourseSchema,
            getValue: (req) => ({
                courseId: req.params.courseId,
            }),
        },
    ),
);

// create a course
courseRouter.post(
    '/create',
    expressAsyncHandler(
        async (validatedData, req, res) => {
            const data = await createCourseService(validatedData);
            return res.status(StatusCodes.OK).json({ success: true, data });
        },
        {
            validationSchema: CreateCourseSchema,
            getValue: (req) => ({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                price: req.body.price,
                category: req.body.category,
                teacherName: req.body.teacherName,
                level: req.body.level,
                status: req.body.status,
            }),
        },
    ),
);

// update a course

export default courseRouter;
