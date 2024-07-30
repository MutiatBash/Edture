import React from "react";
import closeicon from "/icons/close-circle.svg";

const CartCard = ({ course, onRemove }) => {
	return (
		<div className=" p-4 flex items-center gap-4">
			<button onClick={() => onRemove(course)} className="cursor-pointer">
				<img src={closeicon} />
			</button>

			<img
				src={course.image}
				alt={course.title}
				className="w-32 h-20 object-cover rounded-md"
			/>

			{/* Course details */}
			<div className="flex justify-between gap-10 w-full">
				<div>
					<h3 className="text-lg font-semibold leading-6">
						{course.title}
					</h3>
				</div>

				<p className="font-trap-grotesk font-semibold text-lg whitespace-nowrap">
					{course.currency} {course.price}
				</p>
			</div>
		</div>
	);
};

export default CartCard;
