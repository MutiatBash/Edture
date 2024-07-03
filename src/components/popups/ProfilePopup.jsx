import React from "react";
import { Divider } from "../Dividers";
import { NavLink } from "react-router-dom";
import profile from "/profile.svg";
import logout from "/logout.svg";
import settings from "/settings.svg";
import help from "/icons/help.svg";
import certificate from "/icons/certificate.svg";
import wallet from "/icons/wallet.svg";

const ProfilePopup = () => {
	return (
		<div className="fixed shadow bg-white rounded-lg top-24 right-[3%] w-72">
			<div className="flex justify-start items-center p-4 pb-0 gap-4">
				<div className="bg-primaryBlue rounded-full p-2 text-white uppercase w-10 h-10 text-center">
					hh
				</div>
				<div>
					<p className="font-trap-grotesk font-semibold">Hamzat Habibat</p>
					<p className="text-lightGray">hamzat@email.com</p>
				</div>
			</div>
			<Divider />
			<div className="p-4 pt-0">
				<ProfileLink icon={profile} label={"Profile"} />
				<ProfileLink icon={certificate} label={"Certificates"} />
				<ProfileLink icon={wallet} label={"My Purchases"} />
				<ProfileLink icon={settings} label={"Settings"} />
				<ProfileLink icon={help} label={"Help"} />
				<ProfileLink icon={logout} label={"Logout"} />
			</div>
		</div>
	);
};

export default ProfilePopup;

const ProfileLink = ({ to, icon, label }) => (
	<NavLink
		to={to}
		className={`group flex flex-start gap-4 text-lg items-center p-2 px-3 w-full transition duration-300 ease-in-out hover:text-primaryBlue`}
	>
		<img src={icon} alt={label} className="w-6 h-6" />
		<span>{label}</span>
	</NavLink>
);
