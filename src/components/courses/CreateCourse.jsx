import React, { useState } from "react";
import {
	InputField,
	SelectField,
	FileUploadField,
	TextAreaField,
} from "../inputs/CourseCreationInputs";
import { PrimaryButton, SecondaryButton } from "../Button";

const CreateCourse = () => {
	const [step, setStep] = useState(1);

	const handleNextStep = () => setStep(step + 1);
	const handlePreviousStep = () => setStep(step - 1);

	return (
		<div className="create-course-form">
			{step === 1 && (
				<div className="flex flex-col gap-4">
					<InputField
						title="Create a course title"
						subtitle="No pressure : ) you can always update it later!"
						label="Course Title"
						placeholder="Enter course title"
					/>
					<TextAreaField
						title="Course Description"
						label="Description"
						placeholder="Description"
						rows="5"
					/>
					<SelectField
						title="What category best describes your course"
						label="Category"
						options={[
							{ value: "programming", label: "Programming" },
							{ value: "design", label: "Design" },
						]}
					/>
					<SelectField
						title="Add search tags"
						label="Search"
						options={[
							{ value: "programming", label: "Programming" },
							{ value: "design", label: "Design" },
						]}
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
						title="Upload course image"
						label="Course Image"
					/>
					<SelectField
						title="Difficulty Level"
						label="Select Difficulty"
						options={[
							{ value: "beginner", label: "Beginner" },
							{ value: "intermediate", label: "Intermediate" },
							{ value: "advanced", label: "Advanced" },
						]}
					/>
					<div>
						<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
							Pricing
						</h3>
						<div className="flex justify-start items-center gap-2">
							<SelectField
								label="Currency"
								options={[
									{ value: "usd", label: "USD" },
									{ value: "eur", label: "EUR" },
								]}
							/>
							<InputField
								label="Price"
								placeholder="Enter price"
								type="number"
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
					<InputField
						title="Add lessons."
						label="Lesson Title"
						placeholder="Enter lesson title"
					/>
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
