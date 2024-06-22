import React from "react";

const ValidationIndicator = ({ message, isValid }) => {
	return (
		<div className="flex items-center">
			{isValid ? (
				<span className="text-green mr-1">✓</span>
			) : (
				<span className="text-red mr-1">x</span>
			)}
			<span className="text-sm">{message}</span>
		</div>
	);
};

export default ValidationIndicator;
