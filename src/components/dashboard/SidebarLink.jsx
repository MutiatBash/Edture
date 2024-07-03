import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon, activeIcon, label }) => (
	<li>
		<NavLink
			to={to}
			className={({ isActive }) =>
				`group flex flex-start gap-4 text-lg items-center p-2 px-3 w-full rounded-md transition duration-300 ease-in-out ${
					isActive
						? "bg-primaryBlue text-white"
						: "hover:bg-secondaryHoverBlue hover:bg-opacity-50 hover:text-darkGray"
				}`
			}
		>
			{({ isActive }) => (
				<>
					<img
						src={isActive ? activeIcon : icon}
						alt={label}
						className="w-6 h-6"
					/>
					<span>{label}</span>
				</>
			)}
		</NavLink>
	</li>
);

export default SidebarLink;
