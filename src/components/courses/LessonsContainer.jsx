import React , {useState, useEffect} from "react";
import Lesson from "./Lesson";
import { PrimaryButton, SecondaryButton } from "../Button";

const LessonContainer = () => {
	// State and handlers for managing lessons
	const [lessons, setLessons] = useState([]);

	const addLesson = (title) => {
		setLessons([...lessons, { id: Date.now(), title, items: [] }]);
	};

	const updateLesson = (id, updatedLesson) => {
		setLessons(
			lessons.map((lesson) => (lesson.id === id ? updatedLesson : lesson))
		);
	};

	const deleteLesson = (id) => {
		setLessons(lessons.filter((lesson) => lesson.id !== id));
	};

	return (
		<div className="">
			<div className="flex flex-col gap-5">
				{lessons.map((lesson) => (
					<Lesson
						key={lesson.id}
						lesson={lesson}
						updateLesson={updateLesson}
						deleteLesson={deleteLesson}
					/>
				))}
			</div>
			<AddLessonButton addLesson={addLesson} />
		</div>
	);
};

const AddLessonButton = ({ addLesson }) => {
	const [showInput, setShowInput] = useState(false);
	const [title, setTitle] = useState("");

	const handleAdd = () => {
		if (title) {
			addLesson(title);
			setTitle("");
			setShowInput(false);
		}
	};

	return (
		<div>
			{showInput && (
				<div className="flex flex-col gap-2 mt-4">
					<input
						type="text"
						placeholder="Enter lesson title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border border-lightGray rounded-lg p-4 px-5 "
					/>
					<div className="flex gap-2">
						<PrimaryButton onClick={handleAdd} text={"Add Lesson"} />
						<SecondaryButton
							onClick={() => setShowInput(false)}
							text={"Cancel"}
						/>
					</div>
				</div>
			)}
			<SecondaryButton
				onClick={() => setShowInput(true)}
				text={"+ Lesson"}
                className="mt-4"
			/>
		</div>
	);
};

export default LessonContainer;
