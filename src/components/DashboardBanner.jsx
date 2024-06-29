import React from "react";
import dashboardbanner from "/dashboard-banner.svg"

const DashboardBanner = () => {
	return (
		<div className="bg-primaryBlue flex justify-between rounded-xl text-white pl-12">
			<div className="flex flex-col justify-center">
				<h3 className="text-3xl font-semibold">Welcome Back, Habibat</h3>
				<p className="font-trap-grotesk text-2xl">Resume learning</p>
			</div>
            <div className="p-0"><img src={dashboardbanner}/></div>
		</div>
	);
};

export default DashboardBanner;
