// DashboardLayout.js
import React from "react";
import SideBar from "../components/SideBar";
import DashHeader from "../components/DashHeader";

const DashboardLayout = ({ children }) => {
	return (
		<div className="flex">
			<SideBar />
			<div className="flex flex-col w-full flex-grow">
				<DashHeader />
				<div className="p-6 pt-0 pr-12 flex flex-col gap-8">
					{children}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
