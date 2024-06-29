import React from "react";
import SideBar from "../components/SideBar";
import DashboardBanner from "../components/DashboardBanner";
import DashHeader from "../components/DashHeader";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
	return (
		<DashboardLayout>
			<DashboardBanner className="pt-6"/>
		</DashboardLayout>
	);
};

export default Dashboard;
