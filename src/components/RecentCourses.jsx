import React from 'react'
import CourseCard from './CourseCard'

const RecentCourses = () => {
  return (
		<div className='pt-6'>
			<h3 className='font-semibold text-lg'>Your Courses</h3>
			<div className='grid grid-cols-4 gap-4 py-4'>
				<CourseCard />
				<CourseCard />
				<CourseCard />
				<CourseCard />
			</div>
		</div>
  );
}

export default RecentCourses
