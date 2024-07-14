import React from "react";
import CourseHeader from "../components/courses/CourseHeader";
import DashFooter from "../components/dashboard/DashFooter";

const CourseDetailsLayout = ({ children, showFooter = true }) => {
	return (
			
			<div className="flex flex-col w-full flex-grow">
				<CourseHeader />
				<div className="flex flex-col gap-8">{children}</div>
				{showFooter && <DashFooter />}
			</div>
	);
};

export default CourseDetailsLayout;
