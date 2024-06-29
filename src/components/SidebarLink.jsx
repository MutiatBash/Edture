import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon, activeIcon, label }) => (
	<li>
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex flex-start gap-4 text-lg items-center p-2 px-3 w-full rounded-md ${
					isActive ? "bg-primaryBlue text-white" : ""
				}`
			}
		>
			{({ isActive }) => (
				<>
					<img src={isActive ? activeIcon : icon} alt={label} />
					<span>{label}</span>
				</>
			)}
		</NavLink>
	</li>
);

export default SidebarLink;
