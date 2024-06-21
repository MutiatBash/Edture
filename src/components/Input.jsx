import React from "react";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className="flex flex-col w-full gap-2">
			<label htmlFor={props.name} className="font-medium text-darkGray">
				{label} <span className="text-lightGray">*</span>
			</label>
			<input
				{...field}
				{...props}
				className="py-2 px-3 lg:py-3 border border-lightGray rounded-lg placeholder:text-[#c5c3c3a8] focus:border-primaryBlue"
			/>
			{meta.touched && meta.error ? (
				<span className="text-red text-sm">{meta.error}</span>
			) : null}
		</div>
	);
};

export default InputField;
