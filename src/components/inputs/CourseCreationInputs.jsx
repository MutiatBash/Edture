import React, { useState } from "react";

// General Input Field Component
export const InputField = ({ title, label, subtitle, ...props }) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			{subtitle && (
				<p className="text-lg mb-2 text-primaryBlack font-medium">
					{subtitle}
				</p>
			)}
			<label className="sr-only">{label}</label>
			<input
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none"
			/>
		</div>
	);
};

// Text Area Input Field Component
export const TextAreaField = ({ title, subtitle, label, ...props }) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			{subtitle && (
				<p className="text-lg mb-2 text-primaryBlack font-medium">
					{subtitle}
				</p>
			)}
			<label className="sr-only">{label}</label>
			<textarea
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none"
			/>
		</div>
	);
};

// Select Input Field Component
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

// File Upload Input Field Component
export const FileUploadField = ({ title, label, ...props }) => {
	const [fileName, setFileName] = useState("");

	const handleFileChange = (e) => {
		if (e.target.files.length > 0) {
			setFileName(e.target.files[0].name);
		}
	};

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
				onChange={handleFileChange}
				className="border border-lightGray rounded-lg p-4 px-5 file:border-none file:py-1 file:px-2 file:bg-blue-500 file:text-primaryBlue file:rounded-md file:cursor-pointer focus:outline-none"
			/>
			{fileName && (
				<p className="text-lg mt-2 text-primaryBlack">
					Uploaded file: {fileName}
				</p>
			)}
		</div>
	);
};
