import React from "react";
import { CourseCard } from "../cards/CourseCard";
import CourseCarousel from "../carousel/CourseCarousel";

const RecommendedCourses = ({ heading }) => {
	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-medium text-2xl">{heading}</h3>
			<CourseCarousel>
				<CourseCard />
				<CourseCard />
				<CourseCard />
				<CourseCard />
				<CourseCard />
			</CourseCarousel>
		</div>
	);
};

export default RecommendedCourses;
