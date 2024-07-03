import React from "react";
import SideBar from "../components/dashboard/SideBar";
import DashboardBanner from "../components/dashboard/DashboardBanner";
import DashHeader from "../components/dashboard/DashHeader";
import DashboardLayout from "../layouts/DashboardLayout";
import CourseStatusCard from "../components/cards/CourseStatusCard";
import enrolled from "/icons/enrolled-course.svg";
import active from "/icons/active-course.svg";
import completed from "/icons/completed-course.svg";
import ActiveCourses from "../components/courses/ActiveCourses";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import DashFooter from "../components/dashboard/DashFooter";

const Dashboard = () => {
	return (
		<DashboardLayout>
			<DashboardBanner className="pt-6" />
			<div className="grid grid-cols-3 gap-6">
				<CourseStatusCard number={1} status={"Enrolled"} icon={enrolled} />
				<CourseStatusCard number={1} status={"Active"} icon={active} />
				<CourseStatusCard
					number={0}
					status={"Completed"}
					icon={completed}
				/>
			</div>
			<ActiveCourses heading={"Continue learning"} />
			<RecommendedCourses heading={"Recently viewed"} />
			<RecommendedCourses heading={"Recommended courses"} />
			{/* <MultipleItems/> */}
		</DashboardLayout>
	);
};

export default Dashboard;
