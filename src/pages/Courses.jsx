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

const Courses = () => {
	const { tutorDashboardData, user } = useContext(userContext);
	const role = user?.role;

	const [isCreatingCourse, setIsCreatingCourse] = useState(false); 
	const activeCoursesCount =
		tutorDashboardData?.totalActiveCourses?.length || 0;
	const showAddCourse = activeCoursesCount === 0;

	const handleAddCourseClick = () => {
		setIsCreatingCourse(true); // Show CreateCourse component
	};

	const studentContent = (
		<>
			<ActiveCourses heading={"Your Courses"} />
			<RecommendedCourses heading={"Recommended for you"} />
		</>
	);

	const tutorContent = (
		<>
			{isCreatingCourse ? (
				<CreateCourse /> 
			) : (
				<>
					{showAddCourse ? (
						<AddCourseCard
							text={"Create New Course"}
							heading={"My Courses"}
							onClick={handleAddCourseClick} 
						/>
					) : (
						<div className="flex">
							<ActiveCourses heading={"Your Courses"} />
							<AddCourseCard
								text={"Create New Course"}
								heading={"My Courses"}
								onClick={handleAddCourseClick} 
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
