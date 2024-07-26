import React, { useContext, useState } from "react";
import {
	StudentDashboardLayout,
	TutorDashboardLayout,
} from "../layouts/DashboardLayout";
import RecentCourses from "../components/courses/RecentCourses";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import ActiveCourses from "../components/courses/ActiveCourses";
import { userContext } from "../context/UserContext";
import AddCourseCard from "../components/cards/AddCourseCard";
import CreateCourse from "../components/courses/CreateCourse";
import { AllTutorCourses } from "../components/courses/TutorCourse";

const Courses = () => {
	const { tutorDashboardData, studentDashboardData, courses, user } =
		useContext(userContext);
	const role = user?.role;

	const [isCreatingCourse, setIsCreatingCourse] = useState(false);

	const tutorCourses = tutorDashboardData?.courses;
	const sortedTutorCourses = tutorCourses?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);
	const showTutorAddCourse = tutorDashboardData?.courses?.length === 0;

	const allCourses = courses?.courses;
	console.log(allCourses);
	const sortedStudentCourses = allCourses?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	const recentStudentCourses = sortedStudentCourses?.slice(0, 2);
	const recommendedCourses = sortedStudentCourses?.slice(0, 4);

	const dashboardStudentCourses = sortedStudentCourses?.slice(0, 12);
	const activeStudentCoursesCount =
		studentDashboardData?.totalActiveCourses?.length || 0;
	const showAddCourse = activeStudentCoursesCount === 0;

	const handleAddCourseClick = () => {
		setIsCreatingCourse(true);
	};

	const handleCancel = () => {
		setIsCreatingCourse(false);
	};

	const studentContent = (
		<>
			{showAddCourse ? (
				<>
					<AddCourseCard text={"Add Course"} heading={"My Courses"} />
					<RecommendedCourses heading={"Recommended for you"} courses={recommendedCourses}/>
				</>
			) : (
				<>
					<div className="flex">
						<ActiveCourses heading={"Your Courses"} />
						<AddCourseCard text={"Add Course"} heading={"My Courses"} />
					</div>
					<RecommendedCourses heading={"Recommended for you"} courses={recommendedCourses}/>
				</>
			)}
		</>
	);

	const tutorContent = (
		<>
			{isCreatingCourse ? (
				<CreateCourse onCancel={handleCancel} />
			) : (
				<>
					{showTutorAddCourse ? (
						<AddCourseCard
							text={"Create New Course"}
							heading={"My Courses"}
							onClick={handleAddCourseClick}
						/>
					) : (
						<div className="flex flex-col gap-10">
							<AddCourseCard
								text={"Create New Course"}
								heading={"My Courses"}
								onClick={handleAddCourseClick}
							/>
							<AllTutorCourses
								courses={tutorCourses}
								heading={"Your Courses"}
							/>
						</div>
					)}
				</>
			)}
		</>
	);

	const Layout =
		role === "STUDENT" ? StudentDashboardLayout : TutorDashboardLayout;

	return <Layout>{role === "STUDENT" ? studentContent : tutorContent}</Layout>;
};

export default Courses;
