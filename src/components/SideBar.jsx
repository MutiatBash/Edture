import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<div>
			<div></div>
			<div>
				<h5>Overview</h5>
				<div>
					<ul>
						<li>
							<img /> <Link></Link>
						</li>
						<li>
							<img /> <Link></Link>
						</li>
						<li>
							<img /> <Link></Link>
						</li>
						<li>
							<img /> <Link></Link>
						</li>
						<li>
							<img /> <Link></Link>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<h5>Settings</h5>
				<ul>
					<li>
						<img /> <Link></Link>
					</li>
					<li>
						<img /> <Link></Link>
					</li>
					<li>
						<img /> <Link></Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBar;
