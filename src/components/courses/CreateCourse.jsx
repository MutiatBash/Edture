import React, { useState } from "react";
import {
	InputField,
	SelectField,
	FileUploadField,
	TextAreaField,
} from "../inputs/CourseCreationInputs";
import { PrimaryButton, SecondaryButton } from "../Button";
import LessonContainer from "./LessonsContainer";

const CreateCourse = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		courseTitle: "",
		courseDescription: "",
		category: "",
		tags: "",
		courseImage: {
			file: null,
			fileName: "",
			fileUrl: "",
		},
		difficultyLevel: "",
		currency: "",
		price: "",
		lessonTitle: "",
	});

	const handleNextStep = () => setStep(step + 1);
	const handlePreviousStep = () => setStep(step - 1);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (file) => {
		setFormData((prevData) => ({
			...prevData,
			courseImage: {
				file: file,
				fileName: file ? file.name : "",
				fileUrl: file ? URL.createObjectURL(file) : "",
			},
		}));
	};

	return (
		<div className="">
			{step === 1 && (
				<div className="flex flex-col gap-4">
					<InputField
						title="Create a course title"
						subtitle="No pressure : ) you can always update it later!"
						label="Course Title"
						placeholder="Enter course title"
						name="courseTitle"
						value={formData.courseTitle}
						onChange={handleChange}
					/>
					<TextAreaField
						title="Course Description"
						label="Description"
						placeholder="Description"
						rows="5"
						name="courseDescription"
						value={formData.courseDescription}
						onChange={handleChange}
					/>
					<SelectField
						title="What category best describes your course"
						label="Category"
						placeholder="Select category"
						options={[
							{ value: "programming", label: "Programming" },
							{ value: "design", label: "Design" },
						]}
						name="category"
						value={formData.category}
						onChange={handleChange}
					/>
					<SelectField
						title="Add search tags"
						label="Search"
						placeholder="Select tag"
						options={[
							{ value: "programming", label: "Programming" },
							{ value: "design", label: "Design" },
						]}
						name="tags"
						value={formData.tags}
						onChange={handleChange}
					/>
					<div className="flex justify-between pt-8">
						<SecondaryButton text={"Cancel"} />
						<PrimaryButton text={"Next"} onClick={handleNextStep} />
					</div>
				</div>
			)}

			{step === 2 && (
				<div className="flex flex-col gap-4">
					<FileUploadField
						title="Course image"
						subtitle="Upload your course image here"
						label="Course Image"
						note="Guide: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image"
						accept="image/*"
						fileData={formData.courseImage}
						handleFileChange={handleFileChange}
					/>
					<SelectField
						title="Difficulty Level"
						label="Select Difficulty"
						placeholder="Select difficulty level"
						options={[
							{ value: "beginner", label: "Beginner" },
							{ value: "intermediate", label: "Intermediate" },
							{ value: "advanced", label: "Advanced" },
						]}
						name="difficultyLevel"
						value={formData.difficultyLevel}
						onChange={handleChange}
					/>
					<div>
						<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
							Pricing
						</h3>
						<div className="flex justify-start items-center gap-2">
							<SelectField
								label="Currency"
								placeholder="NGN"
								options={[
									{ value: "ngn", label: "NGN" },
									{ value: "usd", label: "USD" },
								]}
								name="currency"
								value={formData.currency}
								onChange={handleChange}
							/>
							<InputField
								label="Price"
								placeholder="0000"
								type="number"
								name="price"
								value={formData.price}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="flex justify-between pt-8">
						<SecondaryButton onClick={handlePreviousStep} text={"Back"} />
						<PrimaryButton onClick={handleNextStep} text={"Next"} />
					</div>
				</div>
			)}

			{step === 3 && (
				<div className="flex flex-col gap-4">
					<LessonContainer/>
					<div className="flex justify-between pt-8">
						<SecondaryButton onClick={handlePreviousStep} text={"Back"} />
						<PrimaryButton onClick={handleNextStep} text={"Next"} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateCourse;
