import React from "react";
import { Divider } from "../Dividers";
import { NavLink } from "react-router-dom";
import profile from "/profile.svg";

const ProfilePopup = () => {
	return (
		<div className="fixed shadow bg-white p-4 top-24 right-10 w-64">
			<div className="flex justify-start items-center gap-4">
				<div className="bg-primaryBlue rounded-full p-2 text-white uppercase w-10 h-10 text-center">
					hh
				</div>
				<div>
					<p>Hamzat Habibat</p>
					<p>hamzat@email.com</p>
				</div>
			</div>
			<Divider />
			<div>
				<ProfileLink icon={profile} label={"Profile"} />
			</div>
		</div>
	);
};

export default ProfilePopup;

const ProfileLink = ({ to, icon, activeIcon, label }) => (
	<li>
		<NavLink
			to={to}
			className={({  }) =>
				`group flex flex-start gap-4 text-lg items-center p-2 px-3 w-full transition duration-300 ease-in-out `
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
