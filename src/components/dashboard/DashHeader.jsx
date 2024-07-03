import React, { useState } from "react";
import inbox from "/inbox.svg";
import search from "/icons/search.svg";
import cart from "/icons/shopping-cart.svg";
import notification from "/icons/notification.svg";
import ProfilePopup from "../popups/ProfilePopup";

const DashHeader = () => {
	const [profile, setProfile] = useState(false);
	const handlePopup = () => {
		setProfile(!profile);
	};

	return (
		<div className="flex justify-between gap-3 bg-white border-b-[0.5px] border-b-lightGray p-6 pr-12 sticky z-30 top-0">
			<div className="flex gap-3 border p-2 border-lightGray rounded-lg w-[78%]">
				<img src={search} />
				<input
					className="text-darkGray placeholder:text-lightGray w-full focus:border-none focus:outline-none"
					placeholder="Search for anything"
				/>
			</div>
			<div className="flex gap-5 items-center">
				<img src={inbox} />
				<img src={notification} />
				<img src={cart} />
				<div className="h-5 w-[1px] bg-darkGray"></div>
				<div className="bg-primaryBlue rounded-full p-2 text-white uppercase w-10 h-10 text-center" onClick={handlePopup}>
					hh
				</div>
				{profile && <ProfilePopup />}
			</div>
		</div>
	);
};

export default DashHeader;
