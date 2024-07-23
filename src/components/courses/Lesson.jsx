import React, { useState, useEffect } from "react";
import { LessonItem } from "./LessonItem";
import { IconButton, PrimaryButton, SecondaryButton } from "../Button";
import { AddTopicInput } from "./LessonItem";
import arrowup from "/icons/arrow-up.svg";
import arrowdown from "/icons/arrow-down.svg";
import { Divider } from "../Dividers";
import addicon from "/icons/add-course.svg";
import deleteicon from "/icons/delete.svg";
import editicon from "/icons/edit.svg";
import documenttext from "/icons/document-text.svg";

const Lesson = ({ lesson, updateLesson, deleteLesson, lessonCount }) => {
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
				<div className="flex gap-3 items-center">
					<h4 className="text-lg font-bold">Lesson {lessonCount}:</h4>
					<div className="flex gap-2 items-center">
						<img src={documenttext} />
						<h4 className="text-md">{lesson?.lessonTitle}</h4>
					</div>
					<div className="flex gap-2 items-center">
						<button className="">
							<img src={editicon} />
						</button>
						<button className="" onClick={() => deleteLesson(lesson?.id)}>
							<img src={deleteicon} />
						</button>
					</div>
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
			<Divider />

			{showItems && (
				<div className="mt-4">
					{items.map((item, index) => (
						<LessonItem
							key={item.id}
							item={{ ...item, index }}
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
		<div className="mt-4 w-full">
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
				<div className="mx-auto w-[10%]">
					<IconButton
						onClick={handleAddTopicClick}
						text={"Topic"}
						className="w-full items-center"
						icon={addicon}
					/>
				</div>
			) : (
				<SecondaryButton
					className="flex gap-2"
					icon={addicon}
					onClick={handleAddLessonItemClick}
					text={"Lesson item"}
				/>
			)}
		</div>
	);
};

export default Lesson;
