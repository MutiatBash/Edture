// DashboardLayout.js
import React from "react";
import SideBar from "../components/dashboard/SideBar";
import DashHeader from "../components/dashboard/DashHeader";
import DashFooter from "../components/dashboard/DashFooter";

const DashboardLayout = ({ children, showFooter = true }) => {
	return (
		<div className="flex">
			<SideBar />
			<div className="flex flex-col w-full flex-grow">
				<DashHeader />
				<div className="p-6 pr-12 flex flex-col gap-8">{children}</div>
				{showFooter && <DashFooter />}
			</div>
		</div>
	);
};

export default DashboardLayout;
