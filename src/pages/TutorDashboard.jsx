import React from "react";
import DashboardBanner from "../components/dashboard/DashboardBanner";
import { TutorDashboardLayout } from "../layouts/DashboardLayout";
import CourseStatusCard from "../components/cards/CourseStatusCard";
import enrolled from "/icons/enrolled-course.svg";
import active from "/icons/active-course.svg";
import ActiveCourses from "../components/courses/ActiveCourses";
import RecommendedCourses from "../components/courses/RecommendedCourses";

const StudentDashboard = () => {
	return (
		<TutorDashboardLayout>
			<DashboardBanner className="pt-6" />
			<div className="grid grid-cols-3 gap-6">
				<CourseStatusCard number={1} status={"Courses"} icon={enrolled} />
				<CourseStatusCard number={1} status={"Active"} icon={active} />
			</div>
			<ActiveCourses heading={"Continue learning"} />
		</TutorDashboardLayout>
	);
};

export default StudentDashboard;
