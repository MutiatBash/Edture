import React, { useState } from "react";
import {
	InputField,
	SelectField,
	FileUploadField,
	TextAreaField,
} from "../inputs/CourseCreationInputs";
import { PrimaryButton, SecondaryButton } from "../Button";
import LessonContainer from "./LessonsContainer";
import { SuccessModal } from "../popups/Modal";
import successgif from "/success-gif.gif";
import QuizCreation from "./QuizCreation";
import axios from "axios";
import useApi from "../../utils/customHooks";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const CreateCourse = ({ onCancel }) => {
	const options = [
		{ value: "programming", label: "Programming" },
		{ value: "ai", label: "AI" },
		{ value: "machine learning", label: "Machine Learning" },
	];
	const [step, setStep] = useState(1);
	const [showModal, setShowModal] = useState(false);

	const [formData, setFormData] = useState({
		courseTitle: "",
		courseDescription: "",
		category: "",
		tags: [],
		courseImage: {
			file: null,
			fileName: "",
			fileUrl: "",
		},
		difficultyLevel: "",
		currency: "",
		price: "",
		instructorsName: "",
		instructorsBio: "",
	});

	const handleCreationConfirmation = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
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

	const handleSelectChange = (selectedOptions) => {
		setFormData((prevData) => ({
			...prevData,
			tags: selectedOptions,
		}));
	};

	const token = localStorage.getItem("authToken");

	if (!token) {
		console.error("No authentication token found");
		return;
	}

	const handleCreateCourse = async () => {
		const cleanedPrice = formData.price.replace(/,/g, "");
		const price = parseFloat(cleanedPrice);

		const courseData = {
			title: formData.courseTitle,
			description: formData.courseDescription,
			category: formData.category,
			tags: formData.tags.map((tag) => tag.value),
			image: formData.courseImage.fileUrl,
			difficulty: formData.difficultyLevel,
			status: "Active",
			price: price,
			currency: formData.currency,
			instructorName: formData.instructorsName,
			instructorBio: formData.instructorsBio,
		};

		try {
			const response = await axios.post(
				"https://edture.onrender.com/courses",
				courseData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log("Course created successfully:", response.data);
			console.log("Paylod:", courseData);
			handleNextStep();
		} catch (error) {
			console.error("Error creating course:", error.message);
			console.log("Paylod:", courseData);
		}
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
					<Select
						isMulti
						components={animatedComponents}
						closeMenuOnSelect={false}
						name="tags"
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={handleSelectChange}
						value={formData.tags}
						theme={(theme) => ({
							...theme,
							borderRadius: 8,
							colors: {
								...theme.colors,
								primary25: "#D9DDFF",
								primary: "white",
							},
						})}
					/>
					<div className="flex justify-between pt-8">
						<SecondaryButton text={"Cancel"} onClick={onCancel} />
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
							{ value: "Beginner", label: "Beginner" },
							{ value: "Intermediate", label: "Intermediate" },
							{ value: "Advanced", label: "Advanced" },
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
									{ value: "NGN", label: "NGN" },
									{ value: "USD", label: "USD" },
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
					<div>
						<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
							Instructor's profile
						</h3>
						<InputField
							label="Instructor's name"
							placeholder="Instructor's name"
							type="text"
							name="instructorsName"
							value={formData.instructorsName}
							onChange={handleChange}
						/>
						<TextAreaField
							label="Instructor's bio"
							placeholder="Instructor's Bio"
							type="text"
							name="instructorsBio"
							rows="6"
							value={formData.instructorsBio}
							onChange={handleChange}
						/>
					</div>

					<div className="flex justify-between pt-8">
						<SecondaryButton
							onClick={handlePreviousStep}
							text={"Previous"}
						/>
						<PrimaryButton onClick={handleCreateCourse} text={"Next"} />
					</div>
				</div>
			)}

			{step === 3 && (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
							Course Curriculum
						</h3>
						<p className="font-trap-grotesk text-lg">
							Build your course by creating lessons and topics. <br></br>
							Use your outline to structure content and label clearly,
							create quiz at the end of the course.
						</p>
					</div>
					<LessonContainer />
					<div className="flex justify-between pt-8">
						<SecondaryButton
							onClick={handlePreviousStep}
							text={"Previous"}
						/>
						<PrimaryButton
							onClick={handleCreationConfirmation}
							text={"Next"}
						/>
					</div>
				</div>
			)}
			{showModal && (
				<SuccessModal
					heading={"Time to curate your course exercise/quiz"}
					buttonText={"Continue"}
					img={successgif}
					imageStyling="w-[60%]"
					onClose={handleCloseModal}
					onConfirm={() => {
						handleCloseModal();
						handleNextStep();
					}}
				/>
			)}

			{step === 4 && (
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
							Course Curriculum
						</h3>
						<p className="font-trap-grotesk text-lg">
							Build your course by creating lessons and topics. <br></br>
							Use your outline to structure content and label clearly,
							create quiz at the end of the course.
						</p>
					</div>
					<QuizCreation />
					<div className="flex justify-between pt-8">
						<SecondaryButton
							onClick={handlePreviousStep}
							text={"Previous"}
						/>
						<PrimaryButton text={"Create"} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateCourse;
