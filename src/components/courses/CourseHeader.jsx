import React, { useState } from "react";
import edture from "/edture-logo.svg";
import inbox from "/inbox.svg";
import search from "/icons/search.svg";
import cart from "/icons/shopping-cart.svg";
import notification from "/icons/notification.svg";
import ProfilePopup from "../popups/ProfilePopup";
import NotificationPopup from "../popups/NotificationPopup";
import InboxPopup from "../popups/InboxPopup";
import CartPopup from "../popups/CartPopup";

const CourseHeader = () => {
	const [popups, setPopups] = useState({
		profile: false,
		notification: false,
		inbox: false,
		cart: false,
	});

	const handlePopup = (popupName) => {
		setPopups((prevPopups) => {
			const newPopups = Object.keys(prevPopups).reduce((acc, key) => {
				acc[key] = key === popupName ? !prevPopups[key] : false;
				return acc;
			}, {});
			return newPopups;
		});
	};

	return (
		<div className="flex justify-between gap-6 items-center bg-white border-b-[0.5px] border-b-lightGray px-12 py-6 sticky z-30 top-0">
			<div className="">
				<img src={edture} />
			</div>
			<div className="flex justify-between gap-4 w-4/5">
				<div className="flex gap-3 border p-2 border-lightGray rounded-lg w-[78%]">
					<img src={search} />
					<input
						className="text-darkGray placeholder:text-lightGray w-full focus:border-none focus:outline-none"
						placeholder="Search for anything"
					/>
				</div>
				<div className="flex gap-5 items-center">
					<img
						src={inbox}
						onClick={() => handlePopup("inbox")}
						className="cursor-pointer"
					/>
					<img
						src={notification}
						onClick={() => handlePopup("notification")}
						className="cursor-pointer"
					/>
					<img
						src={cart}
						onClick={() => handlePopup("cart")}
						className="cursor-pointer"
					/>
					<div className="h-5 w-[1px] bg-darkGray"></div>
					<div
						className="bg-primaryBlue rounded-full p-2 text-white uppercase w-10 h-10 text-center cursor-pointer"
						onClick={() => handlePopup("profile")}
					>
						hh
					</div>
					{popups.profile && <ProfilePopup />}
					{popups.notification && <NotificationPopup />}
					{popups.inbox && <InboxPopup />}
					{popups.cart && <CartPopup />}
				</div>
			</div>
		</div>
	);
};

export default CourseHeader;
