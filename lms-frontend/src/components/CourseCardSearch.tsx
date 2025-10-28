import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const CourseCardSearch = ({
  course,
  isSelected,
  onClick,
}: SearchCourseCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`hover:bg-white-100/10 flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border-2 bg-[#25262F] transition duration-200 ${isSelected ? "border-[#9898fd]" : "border-transparent"}`}
    >
      <div className="relative w-auto pt-[56.25%]">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          fill
          sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between p-4">
        <div>
          <h2 className="line-clamp-1 font-semibold text-white">
            {course.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-white">
            {course.description}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-[#6e6e6e]">By {course.teacherName}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-semibold text-[#b3b3fd]">
              {formatPrice(course.price)}
            </span>
            <span className="text-sm text-[#6e6e6e]">
              {course.enrollments?.length || 200} Enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSearch;
