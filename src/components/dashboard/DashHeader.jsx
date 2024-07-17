import React, { useState, useContext } from "react";
import inbox from "/inbox.svg";
import search from "/icons/search.svg";
import cart from "/icons/shopping-cart.svg";
import notification from "/icons/notification.svg";
import ProfilePopup from "../popups/ProfilePopup";
import NotificationPopup from "../popups/NotificationPopup";
import InboxPopup from "../popups/InboxPopup";
import CartPopup from "../popups/CartPopup";
import { userContext } from "../../context/UserContext";

const DashHeader = () => {
	const { user } = useContext(userContext);
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

	// Get initials from first and last name
	const getInitials = (firstName, lastName) => {
		if (!firstName || !lastName) return "NN";
		return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
	};

	const initials = getInitials(user?.data?.firstname, user?.data?.lastname);

	return (
		<div className="bg-white border-b-[0.5px] border-b-lightGray p-6 pr-12 sticky z-30 top-0">
			<div className="flex justify-between gap-3">
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
						className="bg-primaryBlue rounded-full p-2 text-white uppercase w-10 h-10 text-center cursor-pointer flex items-center justify-center"
						onClick={() => handlePopup("profile")}
					>
						{initials}
					</div>
					{popups.profile && (
						<ProfilePopup
							firstName={user?.data?.firstname}
							lastName={user?.data?.lastname}
							email={user?.data?.email}
							initials={initials}
						/>
					)}
					{popups.notification && <NotificationPopup />}
					{popups.inbox && <InboxPopup />}
					{popups.cart && <CartPopup />}
				</div>
			</div>
		</div>
	);
};

export default DashHeader;
