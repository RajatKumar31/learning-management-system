import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AccordianSections from "@/components/AccordianSections";

export default function SelectedCourse({
  course,
  handleEnrollNow,
}: SelectedCourseProps) {
  return (
    <div className="overflow-hidden px-9 py-9">
      <div>
        <h3 className="text-3xl font-semibold text-[#d2d2d2]">
          {course.title}
        </h3>
        <p className="pt-3 text-sm text-gray-400">
          By {course.teacherName} |{" "}
          <span className="font-bold text-gray-300">
            {course.enrollments?.length || 200}
          </span>
        </p>
      </div>
      <div className="mt-5">
        <p className="mb-4 text-gray-500">{course.description}</p>
        <div className="mt-6">
          <h4 className="mb-2 font-semibold text-[#d2d2d2]">
            {/*Accordian sections*/}
            <AccordianSections sections={course.sections} />
          </h4>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-semibold text-[#b3b3fd]">
            {formatPrice(course.price)}
          </span>
          <Button
            onClick={() => handleEnrollNow(course.courseId)}
            className="bg-[#7878fc] hover:bg-[#9898fd]"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
