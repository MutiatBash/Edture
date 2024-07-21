import React, { useState } from "react";
import imageupload from "/icons/image-upload.svg";


const formatNumber = (value) => {
	if (!value) return "";
	const parts = value.split(".");
	const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	const decimalPart = parts[1] ? `.${parts[1]}` : "";
	return integerPart + decimalPart;
};

export const InputField = ({ title, label, subtitle, type, ...props }) => {
	const [value, setValue] = useState(props.value || "");

	const handleChange = (e) => {
		const { value } = e.target;
		if (type === "number") {
			const cleanedValue = value.replace(/[^0-9.]/g, "");
			setValue(cleanedValue);
			props.onChange && props.onChange(e);
		} else {
			setValue(value);
			props.onChange && props.onChange(e);
		}
	};

	const handleBlur = (e) => {
		if (type === "number") {
			const formattedValue = formatNumber(value);
			setValue(formattedValue);
			props.onBlur && props.onBlur(e);
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
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				{...props}
				className="border border-lightGray rounded-lg p-4 px-5 focus:border-primaryBlue focus:outline-none no-arrows"
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


export const FileUploadField = ({ title, label, subtitle, note, ...props }) => {
	const [fileName, setFileName] = useState("");
	const [fileUrl, setFileUrl] = useState("");

	const handleFileChange = (e) => {
		if (e.target.files.length > 0) {
			const file = e.target.files[0];
			setFileName(file.name);
			setFileUrl(URL.createObjectURL(file));
		} else {
			setFileName("");
			setFileUrl("");
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
			<div className="relative h-72 w-[460px] border border-dashed border-lightGray rounded-lg overflow-hidden">
				<input
					type="file"
					{...props}
					onChange={handleFileChange}
					className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
				/>
				{fileUrl && (
					<img
						src={fileUrl}
						alt={fileName}
						className="absolute inset-0 w-full h-full object-cover rounded-lg"
					/>
				)}
				{!fileUrl && (
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
			{fileName && (
				<p className="text-lg mt-2 text-primaryBlack">
					Uploaded file: {fileName}
				</p>
			)}
		</div>
	);
};

