"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const LoadingSkeleton = () => {
    return (
        <div className="w-3/4">
            <div className="bg-customgreys-secondarybg mt-12 flex h-[500px] items-center justify-between rounded-lg">
                <div className="mx-auto basis-1/2 px-16">
                    <Skeleton className="mb-4 h-8 w-48" />
                    <Skeleton className="mb-2 h-4 w-96" />
                    <Skeleton className="mb-8 h-4 w-72" />
                    <Skeleton className="h-10 w-40" />
                </div>
                <Skeleton className="h-full basis-1/2 rounded-r-lg" />
            </div>
            <div className="mx-auto mt-10 py-12">
                <Skeleton className="mb-4 h-6 w-48" />
                <Skeleton className="mb-8 h-4 w-full max-w-2xl" />
                <div className="mb-8 flex flex-wrap gap-4">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 w-24 rounded-full"
                        />
                    ))}
                </div>
                <div className="mb-8 flex flex-wrap gap-4">
                    {[1, 2, 3, 4].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 w-24 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Landing = () => {
    const router = useRouter();
    const { user } = useUser();
    console.log("user : ", user);
    const currentImage = useCarousel({ totalImages: 3 });
    const { data: courses, isLoading, isError } = useGetCoursesQuery({});

    const handleCourseClick = (courseId: string) => {
        router.push(`/search?id=${courseId}`);
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-3/4"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-12 flex h-[500px] items-center justify-between rounded-lg bg-[#25262F]"
            >
                <div className="mx-auto basis-1/2 px-16">
                    <h1 className="mb-4 text-4xl font-bold text-white">
                        Courses
                    </h1>
                    <p className="mb-8 text-lg text-gray-400">
                        This is the list of courses you can enroll in.
                        <br />
                        Courses when you need them and want them.
                    </p>
                    <div className="w-fit">
                        <Link href="/search">
                            <div className="rounded-md bg-[#7878fc] px-4 py-2 hover:bg-[#9898fd]">
                                Search for Courses
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="relative h-full basis-1/2 overflow-hidden rounded-r-lg">
                    {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map(
                        (src, index) => (
                            <Image
                                key={index}
                                src={src}
                                alt={`image ${index + 1}`}
                                fill
                                priority={index === currentImage}
                                sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={`opacity-0; object-cover transition-opacity duration-500 ${index === currentImage ? "opacity-100" : ""}`}
                            />
                        ),
                    )}
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.3, once: true }}
                className="mx-auto mt-10 py-12"
            >
                <h2 className="mb-4 text-2xl font-semibold text-white">
                    Featured Courses
                </h2>
                <p className="mb-8 text-[#6e6e6e]">
                    From beginner to advanced, in all industries, we have the
                    right courses just for you and preparing your entire journey
                    for learning and making the most.
                </p>
                <div className="mb-8 flex flex-wrap gap-4">
                    {[
                        "Web development",
                        "Enterprise IT",
                        "Reactjs/Nextjs",
                        "Javascript",
                        "Backend Development",
                    ].map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-[#25262F] px-3 py-1 text-sm text-white"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {courses &&
                        courses.slice(0, 5).map((course, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ amount: 0.4 }}
                            >
                                <CourseCardSearch
                                    course={course}
                                    onClick={() => handleCourseClick}
                                />
                            </motion.div>
                        ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Landing;
