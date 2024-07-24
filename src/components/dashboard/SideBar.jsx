import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import SidebarLink from "./SidebarLink";
import dashboard from "/dashboard.svg";
import dashboardactive from "/dashboard-active.svg";
import profile from "/profile.svg";
import profileactive from "/profile-active.svg";
import settings from "/settings.svg";
import settingsactive from "/settings-active.svg";
import logouticon from "/logout.svg";
import logoutactive from "/logout-active.svg";
import inbox from "/inbox.svg";
import inboxactive from "/inbox-active.svg";
import quiz from "/quiz.svg";
import quizactive from "/quiz-active.svg";
import courses from "/courses.svg";
import coursesactive from "/courses-active.svg";
import community from "/community.svg";
import communityactive from "/community-active.svg";
import edture from "/edture-logo.svg";
import LogoutModal from "../authentication/LogoutModal";

export const StudentSideBar = () => {
	const { setShowLogoutModal, logout, showLogoutModal, isLoggingOut } =
		useContext(userContext);

	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();

		setTimeout(() => {
			navigate("/student-signin");
		}, 2000);
	};
	return (
		<>
			<div className="bg-white flex flex-col p-10 pr-5 border-r-[0.5px] border-r-lightGray w-1/5 h-full gap-12 min-h-screen sticky top-0 z-10">
				<div>
					<img src={edture} />
				</div>
				<div className="flex flex-col gap-16">
					<div className="flex flex-col gap-4">
						<h5 className="uppercase text-lightGray text-sm">Overview</h5>
						<div>
							<ul className="flex flex-col gap-2">
								<SidebarLink
									to="/student-dashboard"
									icon={dashboard}
									activeIcon={dashboardactive}
									label="Dashboard"
								/>

								<SidebarLink
									to="/courses"
									icon={courses}
									activeIcon={coursesactive}
									label="Courses"
								/>
								<SidebarLink
									to="/community"
									icon={community}
									activeIcon={communityactive}
									label="Community"
								/>
							</ul>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<h5 className="uppercase text-lightGray text-sm">Settings</h5>
						<ul className="flex flex-col gap-2">
							<SidebarLink
								to="/profile"
								icon={profile}
								activeIcon={profileactive}
								label="Profile"
							/>
							<SidebarLink
								to="/settings"
								icon={settings}
								activeIcon={settingsactive}
								label="Settings"
							/>
							<SidebarLink
								to="/logout"
								onClick={() => setShowLogoutModal(true)}
								icon={logouticon}
								activeIcon={logoutactive}
								label="Logout"
							/>
						</ul>
					</div>
				</div>
			</div>
			{showLogoutModal && (
				<LogoutModal
					show={showLogoutModal}
					onClose={() => setShowLogoutModal(false)}
					onConfirm={handleLogout}
					isLoading={isLoggingOut}
				/>
			)}
		</>
	);
};

export const TutorSideBar = ({}) => {
	const { setShowLogoutModal, logout, showLogoutModal, isLoggingOut } =
		useContext(userContext);

	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();

		setTimeout(() => {
			navigate("/tutor-signin");
		}, 2000);
	};

	return (
		<>
			<div className="bg-white flex flex-col p-10 pr-5 border-r-[0.5px] border-r-lightGray w-1/5 h-full gap-12 min-h-screen sticky top-0 z-10">
				<div>
					<img src={edture} />
				</div>
				<div className="flex flex-col gap-16">
					<div className="flex flex-col gap-4">
						<h5 className="uppercase text-lightGray text-sm">Overview</h5>
						<div>
							<ul className="flex flex-col gap-2">
								<SidebarLink
									to="/tutor-dashboard"
									icon={dashboard}
									activeIcon={dashboardactive}
									label="Dashboard"
								/>
								<SidebarLink
									to="/courses"
									icon={courses}
									activeIcon={coursesactive}
									label="Courses"
								/>
								<SidebarLink
									to="/community"
									icon={community}
									activeIcon={communityactive}
									label="Community"
								/>
							</ul>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<h5 className="uppercase text-lightGray text-sm">Settings</h5>
						<ul className="flex flex-col gap-2">
							<SidebarLink
								to="/profile"
								icon={profile}
								activeIcon={profileactive}
								label="Profile"
							/>
							<SidebarLink
								to="/settings"
								icon={settings}
								activeIcon={settingsactive}
								label="Settings"
							/>
							<SidebarLink
								to="/logout"
								onClick={() => setShowLogoutModal(true)}
								icon={logouticon}
								activeIcon={logoutactive}
								label="Logout"
							/>
						</ul>
					</div>
				</div>
			</div>
			{showLogoutModal && (
				<LogoutModal
					show={showLogoutModal}
					onClose={() => setShowLogoutModal(false)}
					onConfirm={handleLogout}
					isLoading={isLoggingOut}
				/>
			)}
		</>
	);
};
