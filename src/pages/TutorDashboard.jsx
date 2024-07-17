import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";
import DashboardBanner from "../components/dashboard/DashboardBanner";
import { TutorDashboardLayout } from "../layouts/DashboardLayout";
import CourseStatusCard from "../components/cards/CourseStatusCard";
import enrolled from "/icons/enrolled-course.svg";
import active from "/icons/active-course.svg";
import ActiveCourses from "../components/courses/ActiveCourses";
import RecommendedCourses from "../components/courses/RecommendedCourses";

const StudentDashboard = () => {
	const { fetchUserData, setUser } = useContext(userContext);
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const getUserData = async () => {
			const data = await fetchUserData();
			if (data) {
				setUserData(data);
				setUser(data);
			} else {
				navigate("/student-signin");
			}
		};

		getUserData();
	}, [navigate, setUser]);
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
