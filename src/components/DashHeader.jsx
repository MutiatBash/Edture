import React from "react";
import inbox from "/inbox.svg";
import search from "/icons/search.svg";
import cart from "/icons/shopping-cart.svg";
import notification from "/icons/notification.svg";

const DashHeader = () => {
	return (
		<div className="flex justify-between gap-3 border-b-[0.5px] border-b-lightGray p-6 pr-12">
			<div className="flex gap-3 border p-2 border-lightGray rounded-lg w-[78%]">
        <img src={search}/>
				<input className="text-darkGray placeholder:text-lightGray w-full focus:border-none focus:outline-none" placeholder="Search for anything"/>
			</div>
			<div className="flex gap-5 items-center">
				<img src={inbox} />
				<img src={notification} />
				<img src={cart} />
        <div className="h-5 w-[1px] bg-darkGray"></div>
        <div className="bg-primaryBlue rounded-full p-2 text-white uppercase w-10 h-10 text-center">hh</div>
			</div>
		</div>
	);
};

export default DashHeader;
