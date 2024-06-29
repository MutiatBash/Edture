import React from "react";
import SideBar from "../components/SideBar";
import DashboardBanner from "../components/DashboardBanner";
import DashHeader from "../components/DashHeader";

const Dashboard = () => {
	return (
		<div className="flex">
			<SideBar />
			<div className="flex flex-col gap-6 w-full flex-grow">
				<DashHeader />
				<div className="p-6 pt-0 pr-12">
					<DashboardBanner />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
