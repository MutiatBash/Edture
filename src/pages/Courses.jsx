import React from 'react'
import {StudentDashboardLayout} from '../layouts/DashboardLayout'
import RecentCourses from '../components/courses/RecentCourses'
import RecommendedCourses from '../components/courses/RecommendedCourses'
import ActiveCourses from '../components/courses/ActiveCourses'

const Courses = () => {
  return (
		<StudentDashboardLayout>
			<ActiveCourses heading={"Your Courses"} />
			<RecommendedCourses heading={"Recommended for you"} />
		</StudentDashboardLayout>
  );
}

export default Courses
