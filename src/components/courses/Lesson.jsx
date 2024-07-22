import React, { useState, useEffect } from "react";
import LessonItem from "./LessonItem";
import { PrimaryButton, SecondaryButton } from "../Button";
import { AddTopicInput } from "./LessonItem";
import arrowup from "/icons/arrow-up.svg";
import arrowdown from "/icons/arrow-down.svg";

const Lesson = ({ lesson, updateLesson, deleteLesson }) => {
	const [showItems, setShowItems] = useState(true);
	const [items, setItems] = useState(lesson.items);

	useEffect(() => {
		setItems(lesson.items);
	}, [lesson.items]);

	const addLessonItem = (item) => {
		const updatedLesson = { ...lesson, items: [...items, item] };
		updateLesson(lesson.id, updatedLesson);
	};

	const updateLessonItem = (itemId, updatedItem) => {
		const updatedItems = items.map((item) =>
			item.id === itemId ? updatedItem : item
		);
		const updatedLesson = { ...lesson, items: updatedItems };
		updateLesson(lesson.id, updatedLesson);
	};

	const deleteLessonItem = (itemId) => {
		const updatedItems = items.filter((item) => item.id !== itemId);
		const updatedLesson = { ...lesson, items: updatedItems };
		updateLesson(lesson.id, updatedLesson);
	};

	return (
		<div className="border border-lightGray rounded-lg p-6 px-4">
			<div className="flex justify-between items-center">
				<div className="flex gap-3">
					<h3 className="text-lg font-bold">{lesson.title}</h3>
					<button
						className="text-red-500"
						onClick={() => deleteLesson(lesson.id)}
					>
						Delete
					</button>
				</div>
				<div className="flex gap-2">
					<button onClick={() => setShowItems(!showItems)}>
						{showItems ? (
							<img src={arrowup} alt="Collapse" />
						) : (
							<img src={arrowdown} alt="Expand" />
						)}
					</button>
				</div>
			</div>
			{showItems && (
				<div className="mt-4">
					{items.map((item) => (
						<LessonItem
							key={item.id}
							item={item}
							updateLessonItem={updateLessonItem}
							deleteLessonItem={deleteLessonItem}
						/>
					))}
					<AddLessonItemButton addItem={addLessonItem} />
				</div>
			)}
		</div>
	);
};

const AddLessonItemButton = ({ addItem }) => {
	const [showAddTopicButton, setShowAddTopicButton] = useState(false);
	const [showAddTopicInput, setShowAddTopicInput] = useState(false);

	const handleAddLessonItemClick = () => {
		setShowAddTopicButton(true);
	};

	const handleAddTopicClick = () => {
		setShowAddTopicInput(true);
		setShowAddTopicButton(false);
	};

	return (
		<div className="mt-4">
			{showAddTopicInput ? (
				<AddTopicInput
					addTopic={(topic) => {
						addItem(topic);
						setShowAddTopicInput(false);
						setShowAddTopicButton(false);
					}}
					onCancel={() => {
						setShowAddTopicInput(false);
						setShowAddTopicButton(false);
					}}
				/>
			) : showAddTopicButton ? (
				<PrimaryButton onClick={handleAddTopicClick} text={"Add Topic"} />
			) : (
				<SecondaryButton
					onClick={handleAddLessonItemClick}
					text={"+ Lesson Item"}
				/>
			)}
		</div>
	);
};

export default Lesson;
