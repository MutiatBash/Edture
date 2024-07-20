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
import { SpinnerLoader } from "../components/Loader";
import LogoutModal from "../components/authentication/LogoutModal";

const TutorDashboard = () => {
	const {
		tutorDashboardData,
		tutorLoading,
		tutorError,
		userLoading,
		userError,
		setShowLogoutModal,
		showLogoutModal,
		logout,
		isLoggingOut,
		token,
		user,
	} = useContext(userContext);

	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();

		setTimeout(() => {
			navigate("/tutor-signin");
		}, 2000);
	};

	const isNewUser = tutorDashboardData?.courses?.length === 0;
	const role = "TUTOR";

	return (
		<>
			{userLoading || tutorLoading ? (
				<SpinnerLoader />
			) : userError || tutorError ? (
				<div className="text-center mx-auto">
					Error: {userError || tutorError}
				</div>
			) : (
				<TutorDashboardLayout>
					<DashboardBanner className="pt-6" isNewUser={isNewUser} />
					<div className="grid grid-cols-3 gap-6">
						<CourseStatusCard
							number={tutorDashboardData?.totalActiveCourses || 0}
							status={"Courses"}
							icon={enrolled}
						/>
						<CourseStatusCard
							number={tutorDashboardData?.totalActiveCourses || 0}
							status={"Active"}
							icon={active}
						/>
					</div>
					<ActiveCourses heading={"Continue learning"} />
				</TutorDashboardLayout>
			)}

			{showLogoutModal && (
				<LogoutModal
					show={showLogoutModal}
					onClose={() => setShowLogoutModal(false)}
					onConfirm={handleLogout}
					isLoading={isLoggingOut}
				/>
			)}
		</>
	);
};

export default TutorDashboard;
