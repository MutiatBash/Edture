import React from "react";

export const InputField = ({ title, label, subtitle, ...props }) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			{subtitle && (
				<p className="text-lg mb-2 text-primaryBlack font-trap-grotesk font-medium">{subtitle}</p>
			)}
			<label className="sr-only">{label}</label>
			<input
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none"
			/>
		</div>
	);
};

export const TextAreaField = ({ title, subtitle, label, ...props }) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			{subtitle && (
				<p className="text-lg mb-2 text-primaryBlack">{subtitle}</p>
			)}
			<label className="sr-only">{label}</label>
			<textarea
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none"
			/>
		</div>
	);
};

// Select Field Component
export const SelectField = ({ title, label, options, ...props }) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			<label className="sr-only">{label}</label>
			<select
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none"
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

// File Upload Field Component
export const FileUploadField = ({ title, label, ...props }) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			<label className="sr-only">{label}</label>
			<input
				type="file"
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 file:border-none file:py-1 file:px-2 file:bg-blue-500 file:text-primaryBlue file:rounded-md file:cursor-pointer focus:outline-none"
			/>
		</div>
	);
};
