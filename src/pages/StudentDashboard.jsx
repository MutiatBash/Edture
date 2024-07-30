import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardBanner from "../components/dashboard/DashboardBanner";
import { StudentDashboardLayout } from "../layouts/DashboardLayout";
import { userContext } from "../context/UserContext";
import CourseStatusCard from "../components/cards/CourseStatusCard";
import enrolled from "/icons/enrolled-course.svg";
import active from "/icons/active-course.svg";
import completed from "/icons/completed-course.svg";
import { ActiveStudentCourses } from "../components/courses/StudentCourses";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import { SpinnerLoader } from "../components/Loader";
import AddCourseCard from "../components/cards/AddCourseCard";
import CreateCourse from "../components/courses/CreateCourse";

const StudentDashboard = () => {
	const {
		studentDashboardData,
		studentLoading,
		studentError,
		userLoading,
		userError,
		token,
		user,
		courses,
		fetchEnrolledStudentCourses,
		studentCourses,
		setCourses,
	} = useContext(userContext);

	useEffect(() => {
		// Fetch enrolled student courses if not already fetched
		if (!studentCourses || studentCourses.length === 0) {
			fetchEnrolledStudentCourses();
		}
	}, [studentCourses, fetchEnrolledStudentCourses]);

	const [isCreatingCourse, setIsCreatingCourse] = useState(false);

	const handleAddCourseClick = () => {
		setIsCreatingCourse(true);
	};

	const handleCancel = () => {
		setIsCreatingCourse(false);
	};

	const navigate = useNavigate();

	const allCourses = courses?.courses;

	// Debugging logs
	console.log("All Courses:", allCourses);
	console.log("Student Courses:", studentCourses);
	console.log(
		"Student Dashboard Data Enrolled Courses:",
		studentDashboardData?.enrolledCourses
	);

	const sortedStudentCourses = allCourses?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	const recentStudentCourses = sortedStudentCourses?.slice(0, 2);
	const recommendedCourses = sortedStudentCourses?.slice(0, 4);

	const dashboardStudentCourses = sortedStudentCourses?.slice(0, 12);

	const enrolledStudentCourses = studentDashboardData?.enrolledCourses?.slice(
		0,
		5
	);

	const isNewUser = studentDashboardData?.enrolledCourses?.length === 0;
	const activeCoursesCount =
		studentDashboardData?.totalActiveCourses?.length || 0;
	const showAddCourse = activeCoursesCount === 0;
	const role = "STUDENT";

	return (
		<>
			{(userLoading || studentLoading) && <SpinnerLoader />}
			<StudentDashboardLayout>
				<>
					{isCreatingCourse ? (
						<CreateCourse onCancel={handleCancel} />
					) : (
						<>
							<DashboardBanner
								className="pt-6"
								isNewUser={isNewUser}
								role={role}
							/>
							<div className="grid grid-cols-3 gap-6">
								<CourseStatusCard
									number={
										studentDashboardData?.totalEnrolledCourses || 0
									}
									status={"Enrolled"}
									icon={enrolled}
								/>
								<CourseStatusCard
									number={
										studentDashboardData?.totalActiveCourses || 0
									}
									status={"Active"}
									icon={active}
								/>
								<CourseStatusCard
									number={
										studentDashboardData?.totalCompletedCourses || 0
									}
									status={"Completed"}
									icon={completed}
								/>
							</div>
							{isNewUser ? (
								<RecommendedCourses
									heading={"Recommended"}
									courses={recommendedCourses}
								/>
							) : (
								<>
									<div className="">
										<ActiveStudentCourses
											heading={"Your Courses"}
											courses={enrolledStudentCourses}
										/>
										{/* <AddCourseCard text={"Add Course"} /> */}
									</div>
									<RecommendedCourses
										heading={"Recommended"}
										courses={studentCourses}
									/>
								</>
							)}
						</>
					)}
				</>
			</StudentDashboardLayout>
		</>
	);
};

export default StudentDashboard;
