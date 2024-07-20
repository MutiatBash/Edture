import React from "react";
import add from "/icons/add.svg";

const AddCourseCard = ({ onClick , text, heading}) => {
	return (
		<div>
			<h3 className="py-3 font-trap-grotesk text-2xl font-medium">{heading}</h3>
			<div
				className="flex flex-col justify-center items-center text-center gap-4 border border-lighterGray px-8 py-12 rounded-lg w-72 h-80 hover:border-hoverBlue hover:shadow-md"
				onClick={onClick}
			>
				<div className="cursor-pointer bg-lighterGray p-7 rounded-full">
					<img src={add} />
				</div>
				<p className="font-trap-grotesk text-xl font-medium">{text}</p>
			</div>
		</div>
	);
};

export default AddCourseCard;
