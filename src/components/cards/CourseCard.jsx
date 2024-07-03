import React from "react";
import ai from "/ai-course.svg";
import ProgressBar from "../../components/ProgressBar";
import ratings from "/icons/ratings.svg";

export const ActiveCourseCard = ({ progress }) => {
	return (
		<div className="flex flex-col gap-2 border border-lighterGray p-4 rounded-lg w-72 font-trap-grotesk hover:border-hoverBlue hover:shadow-md">
			<div className="w-full">
				<img src={ai} />
			</div>
			<h5 className="font-trap-grotesk font-bold leading-6 text-lg">
				Artificial Intelligence A-Z 2024: Build 7 AI + LLM &...
			</h5>
			<div className="flex flex-col">
				<p className="font-trap-grotesk text-lightGray text-sm">
					Learners hub inc.
				</p>
				<p className="text-lightGray items-center">
					<span className="font-trap-grotesk text-[10px]">
						4 total hours •
					</span>
					<span className="font-trap-grotesk text-[10px]">
						20 lectures •
					</span>
					<span className="font-trap-grotesk text-[10px]"> Beginner</span>
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

export const CourseCard = () => {
	return (
		<div className="flex flex-col gap-2 border border-lighterGray p-4 rounded-lg w-72 font-trap-grotesk hover:border-hoverBlue hover:shadow-md">
			<div className="w-full">
				<img src={ai} />
			</div>
			<h5 className="font-trap-grotesk font-bold leading-6 text-lg">
				Artificial Intelligence A-Z 2024: Build 7 AI + LLM &...
			</h5>
			<div className="flex flex-col">
				<p className="font-trap-grotesk text-lightGray text-sm">
					Learners hub inc.
				</p>
				<p className="text-lightGray items-center">
					<span className="font-trap-grotesk text-[10px]">
						4 total hours •
					</span>
					<span className="font-trap-grotesk text-[10px]">
						20 lectures •
					</span>
					<span className="font-trap-grotesk text-[10px]"> Beginner</span>
				</p>
			</div>
			<div className="flex justify-between">
				<p className="font-trap-grotesk font-semibold">
					N4,900{" "}
					<span className="text-lightGray line-through text-xs font-normal">
						N10,000
					</span>
				</p>
				<div>
					<img src={ratings} />
				</div>
			</div>
		</div>
	);
};
