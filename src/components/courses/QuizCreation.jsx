import React, { useState } from "react";
import { AddQuizInput, QuizItem } from "./QuizItem";
import { IconButton } from "../Button";
import addicon from "/icons/add-course.svg";

const QuizCreation = () => {
	const [quizzes, setQuizzes] = useState([]);
	const [showAddQuizInput, setShowAddQuizInput] = useState(false);

	const addQuiz = (newQuiz) => {
		setQuizzes([...quizzes, newQuiz]);
		setShowAddQuizInput(false);
	};

	const updateQuizItem = (id, updatedQuiz) => {
		setQuizzes(quizzes.map((quiz) => (quiz.id === id ? updatedQuiz : quiz)));
	};

	const deleteQuizItem = (id) => {
		setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
	};

	return (
		<div>
			<div>
				{quizzes.map((quiz) => (
					<QuizItem
						key={quiz.id}
						item={quiz}
						updateQuizItem={updateQuizItem}
						deleteQuizItem={deleteQuizItem}
					/>
				))}
			</div>
			<div className="flex flex-col gap-2 mt-4">
				{showAddQuizInput && (
					<div className="border p-4 border-lightGray rounded-lg">
						<AddQuizInput
							addQuiz={addQuiz}
							onCancel={() => setShowAddQuizInput(false)}
						/>
					</div>
				)}
				<div className="mt-4">
					<IconButton
						icon={addicon}
						text="Quiz"
						onClick={() => setShowAddQuizInput(!showAddQuizInput)}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuizCreation;
