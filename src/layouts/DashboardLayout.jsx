import React from "react";
import { TutorSideBar,StudentSideBar } from "../components/dashboard/SideBar";
import DashHeader from "../components/dashboard/DashHeader";
import DashFooter from "../components/dashboard/DashFooter";

export const StudentDashboardLayout = ({ children, showFooter = true }) => {
	return (
		<div className="flex">
			<StudentSideBar />
			<div className="flex flex-col w-full flex-grow">
				<DashHeader />
				<div className="p-6 pr-12 flex flex-col gap-8">{children}</div>
				{showFooter && <DashFooter />}
			</div>
		</div>
	);
};

export const TutorDashboardLayout = ({ children, showFooter = true }) => {
	return (
		<div className="flex">
			<TutorSideBar />
			<div className="flex flex-col w-full flex-grow">
				<DashHeader />
				<div className="p-6 pr-12 flex flex-col gap-8">{children}</div>
				{showFooter && <DashFooter />}
			</div>
		</div>
	);
};
