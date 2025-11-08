"use client";
import { useState, useEffect } from "react";
import { useGetCoursesQuery } from "@/state/api";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/CourseCardSearch";
import SelectedCourse from "./SelectedCourse";

export default function Search() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data: courses, isLoading, isError } = useGetCoursesQuery({});
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const router = useRouter();
    console.log(selectedCourse);
    useEffect(() => {
        if (courses) {
            if (id) {
                const course = courses.find((course) => course.courseId === id);
                setSelectedCourse(course || courses[0]);
            } else {
                setSelectedCourse(courses[0]);
            }
        }
    }, [courses, id]);

    if (!isLoading) {
        <Loading />;
    }
    if (isError || !courses) {
        return <div>Failed to fetch courses</div>;
    }

    function handleCourseSelect(course: Course) {
        setSelectedCourse(course);
        router.push(`/search?id=${course.courseId}`);
    }

    function handleEnrollNow(courseId: string) {
        router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background text-foreground mx-auto flex h-full w-3/4 flex-col"
        >
            <h1 className="mt-14 text-2xl font-normal text-white">
                List of available courses
            </h1>
            <h2 className="mb-3 text-gray-500">
                {courses.length} courses available
            </h2>
            <div className="flex w-full flex-col-reverse gap-8 pt-2 pb-8 md:flex-row">
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid basis-3/5 auto-rows-fr grid-cols-1 gap-6 xl:grid-cols-2"
                >
                    {courses.map((course) => (
                        <CourseCardSearch
                            key={course.courseId}
                            course={course}
                            isSelected={
                                selectedCourse?.courseId === course.courseId
                            }
                            onClick={() => handleCourseSelect(course)}
                        />
                    ))}
                </motion.div>
                {selectedCourse && (
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="h-fit min-w-[350px] basis-2/5 overflow-hidden rounded-lg border-2 border-[#9898fd] bg-[#25262F]"
                    >
                        <SelectedCourse
                            course={selectedCourse}
                            handleEnrollNow={handleEnrollNow}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
