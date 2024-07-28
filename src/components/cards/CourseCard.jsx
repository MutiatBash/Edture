import React from "react";
import { useNavigate } from "react-router-dom";
import ai from "/ai-course.svg";
import ProgressBar from "../../components/ProgressBar";
import ratings from "/icons/ratings.svg";
import { truncateString } from "../../utils/utils";

export const ActiveCourseCard = ({ progress, course, id }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/courses/${course.id}`);
	};
	return (
		<div
			id={id}
			className="flex flex-col gap-2 border border-lighterGray p-4 rounded-lg w-64 font-trap-grotesk hover:border-hoverBlue hover:shadow-md"
			onClick={handleClick}
		>
			<div className="w-full">
				<img src={course.image} className="w-full" />
			</div>
			<h5 className="font-trap-grotesk font-bold leading-6 text-lg">
				{truncateString(course.title, 38)}
			</h5>
			<div className="flex flex-col">
				<p className="font-trap-grotesk text-lightGray text-sm">
					{course.provider}
				</p>
				<p className="text-lightGray items-center">
					<span className="font-trap-grotesk text-[10px]">
						{course.totalHours} total hours •
					</span>
					<span className="font-trap-grotesk text-[10px]">
						{course.lectures} lectures •
					</span>
					<span className="font-trap-grotesk text-[10px]">
						{" "}
						{course.difficulty}
					</span>
				</p>
			</div>
			<ProgressBar progress={progress} />
			<div className="flex justify-between text-lightGray ">
				<p className="font-trap-grotesk">{progress}% completed</p>
				<div>
					<img src={ratings} />
				</div>
			</div>
		</div>
	);
};

export const CourseCard = ({ course }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/courses/${course.id}`);
	};
	return (
		<div
			className="flex flex-col gap-2 border border-lighterGray p-4 rounded-lg font-trap-grotesk hover:border-hoverBlue hover:shadow-md"
			onClick={handleClick}
		>
			<div className="w-full rounded-lg">
				<img src={course.image} className="w-full rounded-lg" alt="Course" />
			</div>
			<h5 className="font-trap-grotesk font-bold leading-6 text-lg">
				{truncateString(course.title, 38)}
			</h5>
			<div className="flex flex-col">
				<p className="font-trap-grotesk text-lightGray text-sm">
					{course.instructorName}
				</p>
				<p className="text-lightGray items-center">
					<span className="font-trap-grotesk text-[10px]">
						{course.totalVideoDurationInSeconds} total hours •
					</span>
					<span className="font-trap-grotesk text-[10px]">
						{course.totalNumberOfLessons} lectures •
					</span>
					<span className="font-trap-grotesk text-[10px]">
						{" "}
						{course.difficulty}
					</span>
				</p>
			</div>
			<div className="flex justify-between">
				<p className="font-trap-grotesk font-semibold">
					{course.currency}
					<span> {course.price} </span>
					<span className="text-lightGray line-through text-xs font-normal">
						{course.originalPrice}
					</span>
				</p>
				<div>
					<img src={ratings} alt="Ratings" />
				</div>
			</div>
		</div>
	);
};
