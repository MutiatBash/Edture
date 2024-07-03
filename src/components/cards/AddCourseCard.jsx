import React from "react";
import add from "/icons/add.svg";

const AddCourseCard = () => {
	return (
		<div className="flex flex-col justify-center items-center text-center gap-2 border border-lighterGray p-4 rounded-lg w-72 hover:border-hoverBlue hover:shadow-md">
			<div className="cursor-pointer bg-lighterGray p-7 rounded-full">
                <img src={add}/>
            </div>
			<p className="font-trap-grotesk text-xl font-medium">Add course</p>
		</div>
	);
};

export default AddCourseCard;
