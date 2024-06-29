import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import RecentCourses from '../components/RecentCourses'
import RecommendedCourses from '../components/RecommendedCourses'

const Courses = () => {
  return (
    <DashboardLayout>
      <RecentCourses/>
      <RecommendedCourses/>
    </DashboardLayout>
  )
}

export default Courses
