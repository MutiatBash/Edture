import React from "react";
import { CourseCard } from "../cards/CourseCard";

const RecentCourses = ({ heading }) => {
	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-semibold text-2xl">{heading}</h3>
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

export default RecentCourses;
