import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import RecentCourses from '../components/RecentCourses'
import RecommendedCourses from '../components/RecommendedCourses'
import ActiveCourses from '../components/ActiveCourses'

const Courses = () => {
  return (
		<DashboardLayout>
			<ActiveCourses heading={"Your Courses"} />
			<RecommendedCourses heading={"Recommended for you"} />
		</DashboardLayout>
  );
}

export default Courses
