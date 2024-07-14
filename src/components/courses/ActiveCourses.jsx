import React from "react";
import { ActiveCourseCard } from "../cards/CourseCard";
import CourseCarousel from "../carousel/CourseCarousel";
import AddCourseCard from "../cards/AddCourseCard";
import { coursesInProgress } from "../../data";

const ActiveCourses = ({ heading }) => {
	const coursesToShow = coursesInProgress.slice(0, 2);

	return (
		<section className="flex flex-col gap-4">
			<div>
				<h3 className="text-2xl font-medium">{heading}</h3>
			</div>
			<div className="flex gap-3">
				{coursesToShow.map((course) => (
					<ActiveCourseCard progress={course.progress} course={course} />
				))}
				<AddCourseCard />
			</div>
		</section>
	);
};

export default ActiveCourses;
