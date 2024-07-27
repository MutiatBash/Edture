import React, { useState, useContext } from "react";
import {
	InputField,
	SelectField,
	FileUploadField,
	TextAreaField,
} from "../inputs/CourseCreationInputs";
import { PrimaryButton, SecondaryButton } from "../Button";
import { userContext } from "../../context/UserContext";
import LessonContainer from "./LessonsContainer";
import { SuccessModal } from "../popups/Modal";
import successgif from "/success-gif.gif";
import QuizCreation from "./QuizCreation";
import axios from "axios";
import { useApi } from "../../utils/customHooks";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { SpinnerLoader } from "../Loader";

const animatedComponents = makeAnimated();

const CreateCourse = ({ onCancel }) => {
	const {
		loading,
		setLoading,
		error: courseError,
		setError,
	} = useContext(userContext);

	const options = [
		{ value: "programming", label: "Programming" },
		{ value: "ai", label: "AI" },
		{ value: "machine learning", label: "Machine Learning" },
	];
	const [step, setStep] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [courseId, setCourseId] = useState(null);

	const [lessons, setLessons] = useState([]);

	const addLesson = (lessonTitle) => {
		setLessons([...lessons, { id: Date.now(), lessonTitle, items: [] }]);
	};

	const updateLesson = (id, updatedLesson) => {
		setLessons(
			lessons.map((lesson) => (lesson.id === id ? updatedLesson : lesson))
		);
	};

	const deleteLesson = (id) => {
		setLessons(lessons.filter((lesson) => lesson.id !== id));
	};

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

	const validate = () => {
		const newErrors = {};

		// Validate based on the current step
		if (step === 1) {
			// Step 1 validation
			if (!formData.courseTitle)
				newErrors.courseTitle = "Course title is required";
			if (!formData.courseDescription)
				newErrors.courseDescription = "Course description is required";
			if (!formData.category) newErrors.category = "Category is required";
			if (formData.tags.length === 0)
				newErrors.tags = "At least one tag is required";
		} else if (step === 2) {
			// Step 2 validation
			if (!formData.courseImage.file)
				newErrors.courseImage = "Course image is required";
			if (!formData.difficultyLevel)
				newErrors.difficultyLevel = "Difficulty level is required";
			if (!formData.currency) newErrors.currency = "Currency is required";
			if (!formData.price || formData.price <= 0)
				newErrors.price = "Price must be a positive number";
			if (!formData.instructorsName)
				newErrors.instructorsName = "Instructor name is required";
			if (!formData.instructorsBio)
				newErrors.instructorsBio = "Instructor bio is required";
		}

		setError(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCancel = () => {
		setFormData({
			courseTitle: "",
			courseDescription: "",
			category: "",
			tags: [],
			courseImage: { file: null, fileName: "", fileUrl: "" },
			difficultyLevel: "",
			currency: "",
			price: "",
			instructorsName: "",
			instructorsBio: "",
		});
		setError({});
		setStep(1);
		onCancel();
	};

	const handleCreateCourse = async () => {
		const cleanedPrice = formData.price.replace(/,/g, "");
		const price = parseFloat(cleanedPrice);

		if (!validate()) return;

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

		setLoading(true);
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
			setLoading(false);
			const courseCreated = response?.data;
			const { id } = courseCreated.data;
			setCourseId(id);

			console.log("Paylod:", courseData);
			handleNextStep();
		} catch (err) {
			setLoading(false);
			// const errorMessage =
			// 	err.response?.data?.message || "An error occurred";
			// setError(errorMessage);
			console.error("Error creating course:", err.message);
			console.log(err);
			console.log("Paylod:", courseData);
		}
	};

	const handleCreateLessons = async () => {
		const lessonData = {
			lessons: lessons.map((lesson) => ({
				title: lesson.lessonTitle,
				curriculum: lesson.items.map((item) => item.topicTitle),
				topics: lesson.items.map((item) => ({
					title: item.topicTitle,
					contentType: item.content.type,
					textDescription:
						item.content.type === "text" ? item.content.text : "",
					videoUrl: item.content.type === "video" ? item.content.url : "",
					videoDurationInSeconds:
						item.content.type === "video" ? item.content.duration : 0,
					description: item.description || "",
					downloadableMaterials: (item.resources || []).map(
						(resource) => ({
							type: "pdf",
							name: resource.name,
							url: resource.url,
						})
					),
					links: item.links || [],
				})),
			})),
		};

		console.log(lessonData?.lessons);

		try {
			const response = await axios.post(
				`https://edture.onrender.com/courses/${courseId}/lessons`,
				{
					courseId,
					...lessonData,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log(courseId);

			console.log("Lesson created successfully:", response.data);
			console.log("Payload:", lessonData);
			handleCreationConfirmation();
		} catch (error) {
			// setError(error.message);
			console.error("Error creating course:", error.message);
			console.log(error);
			console.log("Payload:", lessonData);
		}
	};

	return (
		<>
			{loading && <SpinnerLoader />}
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
							error={courseError.courseTitle}
						/>
						<TextAreaField
							title="Course Description"
							label="Description"
							placeholder="Description"
							rows="5"
							name="courseDescription"
							value={formData.courseDescription}
							onChange={handleChange}
							error={courseError.courseDescription}
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
							error={courseError.category}
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
							styles={{
								control: (styles, { isFocused }) => ({
									...styles,
									borderColor: courseError.tags
										? "red"
										: styles.borderColor,
									padding: "10px",
									boxShadow: isFocused
										? "0 0 0 1px #4356FF"
										: styles.boxShadow,
								}),
							}}
						/>
						{courseError && (
							<span className="text-red text-sm">
								{courseError.tags}
							</span>
						)}
						<div className="flex justify-between pt-8">
							<SecondaryButton text={"Cancel"} onClick={handleCancel} />
							<PrimaryButton
								text={"Next"}
								onClick={() => {
									if (validate()) {
										setStep((prevStep) => prevStep + 1);
									}
								}}
							/>
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
							error={courseError.courseImage}
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
							error={courseError.difficultyLevel}
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
									error={courseError.currency}
								/>
								<InputField
									label="Price"
									placeholder="0000"
									type="number"
									name="price"
									value={formData.price}
									onChange={handleChange}
									error={courseError.price}
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
								error={courseError.instructorsName}
							/>
							<TextAreaField
								label="Instructor's bio"
								placeholder="Instructor's Bio"
								type="text"
								name="instructorsBio"
								rows="6"
								value={formData.instructorsBio}
								onChange={handleChange}
								error={courseError.instructorsBio}
							/>
						</div>

						<div className="flex justify-between pt-8">
							<SecondaryButton
								onClick={handlePreviousStep}
								text={"Previous"}
							/>
							<PrimaryButton
								onClick={handleCreateCourse}
								text={"Next"}
							/>
						</div>
						{/* <div className="text-red">{courseError}</div> */}
					</div>
				)}

				{step === 3 && (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3">
							<h3 className="text-xl font-semibold mb-2 text-primaryBlack">
								Course Curriculum
							</h3>
							<p className="font-trap-grotesk text-lg">
								Build your course by creating lessons and topics.{" "}
								<br></br>
								Use your outline to structure content and label clearly,
								create quiz at the end of the course.
							</p>
						</div>
						<LessonContainer
							lessons={lessons}
							addLesson={addLesson}
							updateLesson={updateLesson}
							deleteLesson={deleteLesson}
						/>
						<div className="flex justify-between pt-8">
							<SecondaryButton
								onClick={handlePreviousStep}
								text={"Previous"}
							/>
							<PrimaryButton
								onClick={handleCreateLessons}
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
								Build your course by creating lessons and topics.{" "}
								<br></br>
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
		</>
	);
};

export default CreateCourse;
