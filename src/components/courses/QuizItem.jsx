import React, { useState } from "react";
import { SecondaryButton, PrimaryButton, IconButton } from "../Button";
import { InputField } from "../inputs/CourseCreationInputs";
import { Divider } from "../Dividers";
import arrowup from "/icons/arrow-up.svg";
import arrowdown from "/icons/arrow-down.svg";
import addicon from "/icons/add-course.svg";
import check from "/icons/blue-check.svg";
import deleteicon from "/icons/delete.svg";
import editicon from "/icons/edit.svg";
import videoicon from "/icons/video-play.svg";
import documentfile from "/icons/document-download.svg";
import documenttext from "/icons/document-text.svg";
import texticon from "/icons/text-lesson.svg";

export const AddQuizInput = ({ addQuiz, onCancel }) => {
	const [quizTitle, setQuizTitle] = useState("");

	const handleAdd = () => {
		if (quizTitle) {
			addQuiz({ id: Date.now(), quizTitle, questions: [] });
			setQuizTitle("");
			onCancel();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<h4 className="font-medium text-lg">New Quiz:</h4>
			<InputField
				type="text"
				placeholder="Enter quiz title"
				value={quizTitle}
				onChange={(e) => setQuizTitle(e.target.value)}
				className="border border-lightGray rounded-lg p-4 px-5"
			/>
			<div className="flex gap-2 self-end">
				<PrimaryButton onClick={handleAdd} text="Add quiz" />
				<SecondaryButton onClick={onCancel} text="Cancel" />
			</div>
		</div>
	);
};

const QuizQuestionInput = ({ addQuestion, onCancel }) => {
	const [questionText, setQuestionText] = useState("");
	const [questionType, setQuestionType] = useState("multipleChoice");

	const handleAdd = () => {
		if (questionText) {
			addQuestion({
				id: Date.now(),
				text: questionText,
				type: questionType,
				options: [],
			});
			setQuestionText("");
			setQuestionType("multipleChoice");
			onCancel();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<h4 className="font-medium text-lg">New Question:</h4>
			<InputField
				type="text"
				placeholder="Enter question text"
				value={questionText}
				onChange={(e) => setQuestionText(e.target.value)}
				className="border border-lightGray rounded-lg p-4 px-5"
			/>
			<select
				value={questionType}
				onChange={(e) => setQuestionType(e.target.value)}
				className="border border-lightGray rounded-lg p-4 px-5"
			>
				<option value="multipleChoice">Multiple Choice</option>
				<option value="trueFalse">True/False</option>
			</select>
			<div className="flex gap-2 self-end">
				<PrimaryButton onClick={handleAdd} text="Add question" />
				<SecondaryButton onClick={onCancel} text="Cancel" />
			</div>
		</div>
	);
};

const QuizOptionInput = ({ addOption, onCancel }) => {
	const [optionText, setOptionText] = useState("");

	const handleAdd = () => {
		if (optionText) {
			addOption({ id: Date.now(), text: optionText });
			setOptionText("");
			onCancel();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<h4 className="font-medium text-lg">New Option:</h4>
			<InputField
				type="text"
				placeholder="Enter option text"
				value={optionText}
				onChange={(e) => setOptionText(e.target.value)}
				className="border border-lightGray rounded-lg p-4 px-5"
			/>
			<div className="flex gap-2 self-end">
				<PrimaryButton onClick={handleAdd} text="Add option" />
				<SecondaryButton onClick={onCancel} text="Cancel" />
			</div>
		</div>
	);
};

export const QuizItem = ({ item, updateQuizItem, deleteQuizItem }) => {
	const [showAddQuestion, setShowAddQuestion] = useState(false);
	const [showAddOption, setShowAddOption] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const [contentAdded, setContentAdded] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

	const handleAddQuestion = (question) => {
		const updatedItem = { ...item, questions: [...item.questions, question] };
		updateQuizItem(item.id, updatedItem);
		setShowAddQuestion(false);
		setContentAdded(true);
	};

	const handleAddOption = (option) => {
		const updatedItem = { ...item };
		updatedItem.questions[currentQuestionIndex].options.push(option);
		updateQuizItem(item.id, updatedItem);
		setShowAddOption(false);
	};

	const handleDeleteQuestion = (questionId) => {
		const updatedItem = {
			...item,
			questions: item.questions.filter((q) => q.id !== questionId),
		};
		updateQuizItem(item.id, updatedItem);
        if (updatedItem.questions.length === 0) {
				setContentAdded(false); 
			}
	};

	const handleDeleteOption = (questionIndex, optionId) => {
		const updatedItem = { ...item };
		updatedItem.questions[questionIndex].options = updatedItem.questions[
			questionIndex
		].options.filter((o) => o.id !== optionId);
		updateQuizItem(item.id, updatedItem);
	};

	return (
		<div className="flex flex-col border border-lightGray rounded-lg p-4 mt-4">
			<div className="flex justify-between items-center">
				<h4 className="text-lg font-semibold">{item.quizTitle}</h4>
				<IconButton
					text="Question"
					icon={addicon}
					onClick={() => setShowAddQuestion(true)}
				/>
			</div>
			{showAddQuestion && <AddContentButton />}

			{showContent && (
				<>
					<button onClick={() => setShowContent(!showContent)}>
						{showContent ? (
							<img src={arrowup} alt="Collapse" />
						) : (
							<img src={arrowdown} alt="Expand" />
						)}
					</button>
					{contentAdded && <Divider />}

					{item.questions.map((question, questionIndex) => (
						<div key={question.id} className="mt-4">
							<div className="flex justify-between items-center">
								<h5 className="text-md font-semibold">
									{question.text}
								</h5>
								<div className="flex gap-2">
									<button
										onClick={() => handleDeleteQuestion(question.id)}
									>
										<img src={deleteicon} alt="Delete" />
									</button>
									{question.type === "multipleChoice" && (
										<button
											onClick={() => {
												setCurrentQuestionIndex(questionIndex);
												setShowAddOption(true);
											}}
										>
											<img src={addicon} alt="Add Option" />
										</button>
									)}
								</div>
							</div>
							{question.type === "multipleChoice" &&
								question.options.length > 0 && (
									<div className="mt-2">
										{question.options.map((option) => (
											<div
												key={option.id}
												className="flex justify-between items-center"
											>
												<span>{option.text}</span>
												<button
													onClick={() =>
														handleDeleteOption(
															questionIndex,
															option.id
														)
													}
												>
													<img
														src={deleteicon}
														alt="Delete Option"
													/>
												</button>
											</div>
										))}
									</div>
								)}
						</div>
					))}

					{showAddOption && (
						<QuizOptionInput
							addOption={handleAddOption}
							onCancel={() => setShowAddOption(false)}
						/>
					)}
				</>
			)}
		</div>
	);
};

const AddContentButton = ({
	onContentAdded,
	existingContent,
	onContentDeleted,
}) => {
	const [showInput, setShowInput] = useState(false);
	const [contentType, setContentType] = useState(null);
	const [question, setQuestion] = useState(existingContent?.question || "");
	const [choices, setChoices] = useState(existingContent?.choices || [""]);
	const [answer, setAnswer] = useState(existingContent?.answer || "");
	const [trueFalseAnswer, setTrueFalseAnswer] = useState(
		existingContent?.trueFalseAnswer || ""
	);

	const handleAdd = () => {
		if (contentType === "multipleChoice") {
			onContentAdded({ type: "multipleChoice", question, choices, answer });
		} else if (contentType === "trueFalse") {
			onContentAdded({ type: "trueFalse", question, trueFalseAnswer });
		}
		resetState();
	};

	const handleCancel = () => {
		resetState();
	};

	const resetState = () => {
		setQuestion("");
		setChoices([""]);
		setAnswer("");
		setTrueFalseAnswer("");
		setShowInput(false);
		setContentType(null);
	};

	const handleChoiceChange = (index, value) => {
		const newChoices = [...choices];
		newChoices[index] = value;
		setChoices(newChoices);
	};

	const addChoice = () => {
		setChoices([...choices, ""]);
	};

	const removeChoice = (index) => {
		const newChoices = choices.filter((_, i) => i !== index);
		setChoices(newChoices);
	};

	return (
		<div>
			{showInput ? (
				<div className="flex flex-col gap-2">
					{contentType === "multipleChoice" && (
						<>
							<input
								type="text"
								placeholder="Enter question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								className="border border-lightGray rounded-lg p-4 px-5"
							/>
							{choices.map((choice, index) => (
								<div key={index} className="flex gap-2 items-center">
									<input
										type="text"
										placeholder={`Choice ${index + 1}`}
										value={choice}
										onChange={(e) =>
											handleChoiceChange(index, e.target.value)
										}
										className="border border-lightGray rounded-lg p-4 px-5 flex-grow"
									/>
									<button onClick={() => removeChoice(index)}>
										-
									</button>
								</div>
							))}
							<button onClick={addChoice} className="self-start">
								Add Choice
							</button>
							<input
								type="text"
								placeholder="Enter correct answer"
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								className="border border-lightGray rounded-lg p-4 px-5 mt-2"
							/>
							<div className="flex gap-2 mt-4">
								<PrimaryButton onClick={handleAdd} text="Save" />
								<SecondaryButton onClick={handleCancel} text="Cancel" />
								{existingContent && (
									<div className="flex gap-2">
										<button className="">
											<img src={editicon} alt="Edit" />
										</button>
										<button
											className=""
											onClick={handleDeleteContent}
										>
											<img src={deleteicon} alt="Delete" />
										</button>
									</div>
								)}
							</div>
						</>
					)}
					{contentType === "trueFalse" && (
						<>
							<input
								type="text"
								placeholder="Enter question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								className="border border-lightGray rounded-lg p-4 px-5"
							/>
							<div className="flex gap-2 items-center mt-2">
								<label>
									<input
										type="radio"
										name="trueFalse"
										value="true"
										checked={trueFalseAnswer === "true"}
										onChange={(e) =>
											setTrueFalseAnswer(e.target.value)
										}
									/>
									True
								</label>
								<label>
									<input
										type="radio"
										name="trueFalse"
										value="false"
										checked={trueFalseAnswer === "false"}
										onChange={(e) =>
											setTrueFalseAnswer(e.target.value)
										}
									/>
									False
								</label>
							</div>
							<div className="flex gap-2 mt-4">
								<PrimaryButton onClick={handleAdd} text="Save" />
								<SecondaryButton onClick={handleCancel} text="Cancel" />
								{existingContent && (
									<div className="flex gap-2">
										<button className="">
											<img src={editicon} alt="Edit" />
										</button>
										<button
											className=""
											onClick={handleDeleteContent}
										>
											<img src={deleteicon} alt="Delete" />
										</button>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			) : (
				<div className="flex gap-2 mt-4 justify-center">
					<IconButton
						onClick={() => {
							setShowInput(true);
							setContentType("multipleChoice");
						}}
						text="Multiple Choice"
						className="border-primaryBlue"
						icon={texticon}
					/>
					<IconButton
						onClick={() => {
							setShowInput(true);
							setContentType("trueFalse");
						}}
						text="True/False"
						icon={videoicon}
					/>
				</div>
			)}
		</div>
	);
};
