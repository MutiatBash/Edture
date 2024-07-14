import React, { useState } from "react";
import video from "/icons/video.svg";
import arrowup from "/icons/arrow-up.svg";
import arrowdown from "/icons/arrow-down.svg";

const CourseModule = ({ moduleTitle, submodules, expandAll }) => {
	// const [isOpen, setIsOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(expandAll); 

	const toggleModule = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="course-module w-full border border-lightGray">
			<div
				className="flex gap-2 bg-nude p-3 cursor-pointer transition-all ease-in duration-300"
				onClick={toggleModule}
			>
				<span className="transform transition-transform duration-300">
					<img
						src={isOpen ? arrowup : arrowdown}
						alt="Toggle icon"
						className="w-4 h-4"
					/>
				</span>
				<h3>{moduleTitle}</h3>
			</div>
			{isOpen || expandAll ? (
				<div className="submodules bg-white p-3">
					{submodules.map((submodule, index) => (
						<div key={index} className="flex gap-2 pb-2">
							<img src={video} className="" />
							<p className="text-darkGray opacity-80">{submodule}</p>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default CourseModule;
