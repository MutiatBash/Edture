import React, { useState, useEffect } from "react";
import imageupload from "/icons/image-upload.svg";

const formatNumber = (value) => {
	if (!value) return "";
	const parts = value.split(".");
	const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	const decimalPart = parts[1] ? `.${parts[1]}` : "";
	return integerPart + decimalPart;
};

export const InputField = ({
	title,
	label,
	subtitle,
	type,
	name,
	value,
	onChange,
    placeholder
}) => {
	const [inputValue, setInputValue] = useState(value || "");

	const handleChange = (e) => {
		const { value } = e.target;
		if (type === "number") {
			const cleanedValue = value.replace(/[^0-9.]/g, "");
			setInputValue(cleanedValue);
			onChange && onChange({ target: { name, value: cleanedValue } });
		} else {
			setInputValue(value);
			onChange && onChange({ target: { name, value } });
		}
	};

	const handleBlur = (e) => {
		if (type === "number") {
			const formattedValue = formatNumber(inputValue);
			setInputValue(formattedValue);
			onChange && onChange({ target: { name, value: formattedValue } });
		}
	};

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
				type={type === "number" ? "text" : type}
				name={name}
				value={inputValue}
                placeholder={placeholder}
				onChange={handleChange}
				onBlur={handleBlur}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none no-arrows"
			/>
		</div>
	);
};

// Text Area Input Field Component
export const TextAreaField = ({
	title,
	subtitle,
	label,
	value,
	onChange,
	...props
}) => {
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
				value={value}
				onChange={onChange}
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none"
			/>
		</div>
	);
};

// Select Input Field Component
export const SelectField = ({
	title,
	label,
	options,
	value,
	onChange,
	placeholder,
	...props
}) => {
	return (
		<div className="flex flex-col mb-4">
			{title && (
				<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
					{title}
				</h3>
			)}
			<label className="sr-only">{label}</label>
			<select
				value={value}
				onChange={onChange}
				{...props}
				className={`border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none ${
					!value ? "text-lightGray" : "text-primaryBlack"
				}`}
			>
				<option value="" disabled className="text-lightGray">
					{placeholder}
				</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

// File Upload Component
export const FileUploadField = ({
	title,
	label,
	subtitle,
	note,
	fileData,
	handleFileChange,
	...props
}) => {
	const [localFileData, setLocalFileData] = useState(fileData);

	useEffect(() => {
		setLocalFileData(fileData);
	}, [fileData]);

	const onFileChange = (e) => {
		const file = e.target.files.length > 0 ? e.target.files[0] : null;
		handleFileChange(file);
	};

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
			<div className="relative h-72 w-[460px] border border-dashed border-lightGray rounded-lg overflow-hidden">
				<input
					type="file"
					{...props}
					onChange={onFileChange}
					className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
				/>
				{localFileData.fileUrl ? (
					<img
						src={localFileData.fileUrl}
						alt={localFileData.fileName}
						className="absolute inset-0 w-full h-full object-cover rounded-lg"
					/>
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center text-primaryBlack p-4 bg-lighterGray gap-2">
						<img
							src={imageupload}
							className="rounded-full bg-white p-10"
						/>
						<span>Click to upload an image</span>
					</div>
				)}
			</div>
			{note && <p className="mt-2 text-lightGray">{note}</p>}
			{localFileData.fileName && (
				<p className="text-lg mt-2 text-primaryBlack">
					Uploaded file: {localFileData.fileName}
				</p>
			)}
		</div>
	);
};
