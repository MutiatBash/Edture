import React, { useContext } from "react";
import CourseDetailsLayout from "../layouts/CourseDetailsLayout";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import { userContext } from "../context/UserContext";

const Cart = () => {
	const { allCourses } = useContext(userContext);

	const recommendedCourses = allCourses?.courses.slice(0, 4);
	return (
		<div>
			<CourseDetailsLayout>
				<RecommendedCourses
					heading={"You might also like"}
					courses={recommendedCourses}
					styleClass="px-12 py-10"
				/>
			</CourseDetailsLayout>
		</div>
	);
};

export default Cart;
