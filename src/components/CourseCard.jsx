import React from "react";
import ai from "/ai-course.svg";

const CourseCard = () => {
	return (
		<div className="flex flex-col gap-2 border border-lighterGray p-4 rounded-lg w-full font-trap-grotesk">
			<div className="w-full">
				<img src={ai} />
			</div>
			<div>
				<h5 className="font-trap-grotesk font-bold leading-6 text-lg">
					Artificial Intelligence A-Z 2024: Build 7 AI + LLM &...
				</h5>
				<p className="font-trap-grotesk text-lightGray text-sm">
					Learners hub inc.
				</p>
			</div>
			<div className="text-lightGray items-center ">
				<span className="font-trap-grotesk text-[10px]">
					4 total hours •
				</span>
				<span className="font-trap-grotesk text-[10px]"> 20 lectures •</span>
				<span className="font-trap-grotesk text-[10px]"> Beginner</span>
			</div>
		</div>
	);
};

export default CourseCard;
