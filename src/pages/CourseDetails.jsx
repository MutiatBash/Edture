import { useParams } from "react-router-dom";
import { courses } from "../data";
import CourseDetailsLayout from "../layouts/CourseDetailsLayout";
import { PrimaryButton, SecondaryButton } from "../components/Button";

const CourseDetails = () => {
	const { id } = useParams();
	const course = courses.find((course) => course.id === parseInt(id));

	if (!course) {
		return <div>Course not found</div>;
	}

	return (
		<CourseDetailsLayout>
			<div className="flex relative bg-darkBlue content-wrapper text-white pt-10">
				<div className="w-3/5 flex flex-col p-12">
					<h1 className="font-trap-grotesk font-bold text-5xl mb-4">
						{course.title}
					</h1>
					<p className="font-trap-grotesk text-sm mb-2 whitespace-pre-line">
						{course.description}
					</p>
					<div className="flex gap-2 mb-2">
						<div className="flex gap-1 items-center">
							<img src={course.ratings} alt="Ratings" />
							<span className="font-trap-grotesk">4.5 •</span>
						</div>
						<span className="font-trap-grotesk">
							Last updated: {course.lastUpdated} •
						</span>
						{course.certificateAvailable && (
							<span className="font-trap-grotesk">
								Certificate available
							</span>
						)}
					</div>
					<div>
						<p className="font-trap-grotesk text-sm mb-2">
							Instructor: {course.provider}
						</p>
					</div>
				</div>

				<CourseModal course={course} />
			</div>
		</CourseDetailsLayout>
	);
};

export default CourseDetails;

const CourseModal = ({ course }) => {
	return (
		<div className="absolute top-16 right-14 p-4 w-1/3 bg-white shadow-lg z-30 rounded-lg">
			<img src={course.image} className="w-full mb-4" alt="Course" />
			<p className="font-trap-grotesk font-semibold text-3xl mb-2 text-primaryBlack">
				{course.price}{" "}
				<span className="text-lightGray line-through text-xs font-normal">
					{course.originalPrice}
				</span>
			</p>
			<div className="flex flex-col gap-4">
				<PrimaryButton text={"Add to cart"} className="w-full" />
				<SecondaryButton text={"Buy Now"} className="w-full" />
			</div>
		</div>
	);
};
