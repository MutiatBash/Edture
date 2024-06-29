import React from "react";
import SidebarLink from "./SidebarLink";
import dashboard from "/dashboard.svg";
import dashboardactive from "/dashboard-active.svg";
import profile from "/profile.svg";
import profileactive from "/profile-active.svg";
import settings from "/settings.svg";
import settingsactive from "/settings-active.svg";
import logout from "/logout.svg";
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

const SideBar = () => {
	return (
		<div className="bg-white flex flex-col p-10 pr-5 border-r-[0.5px] border-r-lightGray w-1/5 h-full gap-12 min-h-screen sticky top-0">
			<div><img src={edture}/></div>
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-4">
					<h5 className="uppercase text-lightGray text-sm">Overview</h5>
					<div>
						<ul className="flex flex-col gap-2">
							<SidebarLink
								to="/dashboard"
								icon={dashboard}
								activeIcon={dashboardactive}
								label="Dashboard"
							/>
							<SidebarLink
								to="/inbox"
								icon={inbox}
								activeIcon={inboxactive}
								label="Inbox"
							/>
							<SidebarLink
								to="/courses"
								icon={courses}
								activeIcon={coursesactive}
								label="Courses"
							/>
							<SidebarLink
								to="/quizzes"
								icon={quiz}
								activeIcon={quizactive}
								label="Quizzes"
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
							to="/settings"
							icon={logout}
							activeIcon={logoutactive}
							label="Logout"
						/>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
