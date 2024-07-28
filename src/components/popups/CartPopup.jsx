import React from "react";
import { Divider } from "../Dividers";
import { Link } from "react-router-dom";

const CartPopup = () => {
	return (
		<div className="fixed shadow bg-white rounded-lg top-24 right-[3%] w-72">
			<div className="flex justify-between items-center p-4 pb-2 gap-4">
				<p className="font-trap-grotesk font-semibold">Cart</p>
				<Link className="text-primaryBlue font-trap-grotesk font-medium text-sm" to="/cart">Checkout</Link>
			</div>
			<Divider />
			<div className="flex flex-col gap-3 p-4 text-center">
				<div className="bg-[#fff6ff] py-4 px-3 rounded-lg">
					Your cart is empty
				</div>
				<Link
					to="/allcourses"
					className="text-primaryBlue text-center font-trap-grotesk font-medium"
				>
					Explore Courses
				</Link>
			</div>
		</div>
	);
};

export default CartPopup;
