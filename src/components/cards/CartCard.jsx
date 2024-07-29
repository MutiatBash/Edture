import React from "react";

const CartCard = ({ course, onRemove }) => {
	return (
		<div className=" p-4 flex items-start gap-4">
			<button
				onClick={() => onRemove(course)}
				className="text-gray-500 hover:text-red-600 focus:outline-none flex items-center justify-center w-8 h-8 rounded-full bg-gray-200"
			>
				<span className="text-xl font-bold">&#x2715;</span>
			</button>

			
			<img
				src={course.image}
				alt={course.title}
				className="w-16 h-16 object-cover rounded-md"
			/>

			{/* Course details */}
			<div className="flex flex-col flex-grow">
				<h3 className="text-lg font-semibold text-gray-800">
					{course.title}
				</h3>
				<p className="text-gray-600">
					{course.currency} {course.price}
				</p>
			</div>
		</div>
	);
};

export default CartCard;
