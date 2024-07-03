import React from "react";
import { ActiveCourseCard } from "../cards/CourseCard";
import CourseCarousel from "../carousel/CourseCarousel";
import AddCourseCard from "../cards/AddCourseCard";

const ActiveCourses = ({ heading }) => {
	return (
		<section className="flex flex-col gap-4">
			<div>
				<h3 className="text-2xl font-medium">{heading}</h3>
			</div>
			<div className="flex gap-3">
				<ActiveCourseCard progress={68} />
				<AddCourseCard />
			</div>
		</section>
	);
};

export default ActiveCourses;
