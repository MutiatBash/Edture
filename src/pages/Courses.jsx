import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import RecentCourses from '../components/courses/RecentCourses'
import RecommendedCourses from '../components/courses/RecommendedCourses'
import ActiveCourses from '../components/courses/ActiveCourses'

const Courses = () => {
  return (
		<DashboardLayout>
			<ActiveCourses heading={"Your Courses"} />
			<RecommendedCourses heading={"Recommended for you"} />
		</DashboardLayout>
  );
}

export default Courses
