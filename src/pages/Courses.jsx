import React, { useContext, useState } from "react";
import {
	StudentDashboardLayout,
	TutorDashboardLayout,
} from "../layouts/DashboardLayout";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import { ActiveStudentCourses, AllStudentCourses } from "../components/courses/StudentCourses";
import { userContext } from "../context/UserContext";
import AddCourseCard from "../components/cards/AddCourseCard";
import CreateCourse from "../components/courses/CreateCourse";
import { AllTutorCourses } from "../components/courses/TutorCourse";
import { useNavigate } from "react-router-dom";

const Courses = () => {
	const {
		tutorDashboardData,
		studentDashboardData,
		courses,
		user,
		studentCourses,
	} = useContext(userContext);
	const role = user?.role;

	const navigate = useNavigate();

	const [isCreatingCourse, setIsCreatingCourse] = useState(false);

	const tutorCourses = tutorDashboardData?.courses;
	const sortedTutorCourses = tutorCourses?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);
	const showTutorAddCourse = tutorDashboardData?.courses?.length === 0;

	const allCourses = courses?.courses;

	const sortedStudentCourses = allCourses?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	const sortedActiveStudentCourses = studentCourses?.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	);

	const notEnrolledCourses = sortedActiveStudentCourses?.slice(0, 4);
	const recommendedCourses = sortedStudentCourses?.slice(0, 4);

	const dashboardStudentCourses = sortedStudentCourses?.slice(0, 12);
	const isNewStudent = studentDashboardData?.enrolledCourses?.length === 0;

	const handleAddCourseClick = () => {
		setIsCreatingCourse(true);
	};

	const handleCancel = () => {
		setIsCreatingCourse(false);
	};

	const handleViewCourse = () => {
		navigate("/allcourses");
		console.log("navigating to courses");
	};

	const studentContent = (
		<>
			{isNewStudent ? (
				<>
					<AddCourseCard
						text={"Add Course"}
						heading={"My Courses"}
						onClick={handleViewCourse}
					/>
					<RecommendedCourses
						heading={"Recommended for you"}
						courses={recommendedCourses}
					/>
					<RecommendedCourses
						heading={"Top searches"}
						courses={recommendedCourses}
					/>
				</>
			) : (
				<>
					<div className="flex">
						{/* <ActiveStudentCourses heading={"Your Courses"} /> */}
						<AddCourseCard
							text={"Add Course"}
							heading={"My Courses"}
							onClick={handleViewCourse}
						/>
					</div>
					<RecommendedCourses
						heading={"Recommended for you"}
						courses={notEnrolledCourses}
						slidesToShow={3}
					/>
					<AllStudentCourses itemsPerPage="9" courses={sortedActiveStudentCourses} gridCol={"grid-cols-3"}/>
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
