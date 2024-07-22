import React, { useState } from "react";
import { IconButton, PrimaryButton, SecondaryButton } from "../Button";
import arrowup from "/icons/arrow-up.svg";
import arrowdown from "/icons/arrow-down.svg";

export const AddTopicInput = ({ addTopic, onCancel }) => {
	const [title, setTitle] = useState("");

	const handleAdd = () => {
		if (title) {
			addTopic({ id: Date.now(), title, content: null });
			setTitle("");
			onCancel();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				type="text"
				placeholder="Enter topic title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="border border-lightGray rounded-lg p-4 px-5"
			/>
			<div className="flex gap-2">
				<PrimaryButton onClick={handleAdd} text="Add" />
				<SecondaryButton onClick={onCancel} text="Cancel" />
			</div>
		</div>
	);
};

const FileInput = ({ onChange }) => (
	<div className="border w-full flex justify-between items-center pl-6 border-lightGray rounded-lg">
		<span>No file selected</span>
		<label className="flex items-center cursor-pointer">
			<div className="border p-4 px-5 rounded-tr-md rounded-br-md border-primaryBlue">
				<input
					type="file"
					accept=".pdf"
					onChange={onChange}
					className="absolute right-0 hidden"
				/>
				<span className="text-primaryBlue font-medium">Select file</span>
			</div>
		</label>
	</div>
);

const ResourceItem = ({ file, onDelete }) => (
	<div className="flex justify-between items-center border border-dashed border-lightGray rounded-lg p-4 px-5 w-full">
		<div>{file.name}</div>
		<button className="text-primaryBlue" onClick={onDelete}>
			Delete
		</button>
	</div>
);

const TextContentItem = ({ text, onEdit, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(text);

	const handleEdit = () => {
		if (editText) {
			onEdit(editText);
			setIsEditing(false);
		}
	};

	return (
		<div>
			{isEditing ? (
				<>
					<textarea
						placeholder="Add content"
						value={editText}
						onChange={(e) => setText(e.target.value)}
						rows="6"
						className="border border-lightGray rounded-lg p-4 px-5 w-full"
					/>
					<div className="flex gap-2 mt-2">
						<PrimaryButton onClick={handleEdit} text="Save" />
						<SecondaryButton
							onClick={() => setIsEditing(false)}
							text="Cancel"
						/>
					</div>
				</>
			) : (
				<>
					<p>{text}</p>
					<div className="flex gap-2 mt-2">
						<PrimaryButton
							onClick={() => setIsEditing(true)}
							text="Edit"
						/>
						<SecondaryButton onClick={onDelete} text="Delete" />
					</div>
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
	const [text, setText] = useState(existingContent?.text || "");
	const [file, setFile] = useState(existingContent?.file || null);

	const handleAdd = () => {
		if (text || file) {
			onContentAdded({ type: file ? "video" : "text", file, text });
			resetState();
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			onContentAdded({ type: "video", file: selectedFile });
			resetState();
		}
	};

	const handleCancel = () => {
		resetState();
	};

	const handleDeleteContent = () => {
		onContentDeleted();
		resetState();
	};

	const handleDeleteVideo = () => {
		setFile(null);
		setShowInput(true);
		setContentType("video");
	};

	const resetState = () => {
		setText("");
		setFile(null);
		setShowInput(false);
		setContentType(null);
	};

	return (
		<div>
			{showInput ? (
				<div className="flex flex-col gap-2">
					{contentType === "text" && (
						<>
							<textarea
								placeholder="Add content"
								value={text}
								onChange={(e) => setText(e.target.value)}
								rows="6"
								className="border border-lightGray rounded-lg p-4 px-5"
							/>
							<div className="flex gap-2 mt-4">
								<PrimaryButton onClick={handleAdd} text="Save" />
								<SecondaryButton onClick={handleCancel} text="Cancel" />
								{existingContent && (
									<SecondaryButton
										onClick={handleDeleteContent}
										text="Delete"
										className="text-red-500"
									/>
								)}
							</div>
						</>
					)}
					{contentType === "video" && (
						<div className="">
							{file ? (
								<ResourceItem
									file={file}
									onDelete={handleDeleteVideo}
								/>
							) : (
								<div className="flex justify-between items-center relative pl-5 border border-lightGray rounded-lg">
									<span>No file selected</span>
									<label className="flex items-center cursor-pointer">
										<div className="border p-4 px-5 rounded-tr-md rounded-br-md border-primaryBlue">
											<input
												type="file"
												accept="video/*"
												onChange={handleFileChange}
												className="absolute right-0 hidden"
											/>
											<span className="text-primaryBlue font-medium">
												Select Video
											</span>
										</div>
									</label>
								</div>
							)}
						</div>
					)}
				</div>
			) : (
				<div className="flex gap-2 mt-4">
					<IconButton
						onClick={() => {
							setShowInput(true);
							setContentType("text");
						}}
						text="Text"
						className="border-primaryBlue"
					/>
					<IconButton
						onClick={() => {
							setShowInput(true);
							setContentType("video");
						}}
						text="Video"
					/>
				</div>
			)}
		</div>
	);
};

const LessonItem = ({ item, updateLessonItem, deleteLessonItem }) => {
	const [showAddContent, setShowAddContent] = useState(false);
	const [showAddResource, setShowAddResource] = useState(false);
	const [contentAdded, setContentAdded] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const [file, setFile] = useState(null);
	const [inputFields, setInputFields] = useState([]);
	const [resources, setResources] = useState(item.resources || []);
	const [editingText, setEditingText] = useState(false);
	const [newText, setNewText] = useState(item.content?.text || "");

	const addTopic = (topic) => {
		const updatedItem = { ...item, topics: [...item.topics, topic] };
		updateLessonItem(item.id, updatedItem);
		setShowAddTopic(false);
	};

	const updateTopic = (topicId, updatedTopic) => {
		const updatedTopics = item.topics.map((topic) =>
			topic.id === topicId ? updatedTopic : topic
		);
		const updatedItem = { ...item, topics: updatedTopics };
		updateLessonItem(item.id, updatedItem);
	};

	const deleteTopic = (topicId) => {
		const updatedTopics = item.topics.filter((topic) => topic.id !== topicId);
		const updatedItem = { ...item, topics: updatedTopics };
		updateLessonItem(item.id, updatedItem);
	};

	const handleAddContent = () => {
		setShowAddContent(true);
		setShowContent(true);
	};

	const handleContentAdded = (content) => {
		const updatedItem = { ...item, content };
		updateLessonItem(item.id, updatedItem);
		setShowAddContent(false);
		setContentAdded(true);
		setShowAddResource(true);
	};

	const handleResourceUpload = (e) => {
		const uploadedFile = e.target.files[0];
		if (uploadedFile) {
			setResources((prevResources) => [...prevResources, uploadedFile]);
			e.target.value = null;
		}
	};

	const handleAddResource = () => {
		if (inputFields.length === 0) {
			setInputFields([{ id: Date.now() }]);
		}
	};

	const handleDeleteResource = (fileName) => {
		const updatedResources = resources.filter((res) => res.name !== fileName);
		setResources(updatedResources);
	};

	const handleDeleteContent = () => {
		const updatedItem = { ...item, content: null };
		updateLessonItem(item.id, updatedItem);
		setShowAddContent(true);
		setContentAdded(false);
	};

	const handleDeleteVideo = () => {
		setFile(null);
		handleDeleteContent();
	};

	const handleEditText = (newText) => {
		const updatedItem = {
			...item,
			content: { ...item.content, text: newText },
		};
		updateLessonItem(item.id, updatedItem);
	};

	const handleDeleteText = () => {
		const updatedItem = { ...item, content: { type: null, text: null } };
		updateLessonItem(item.id, updatedItem);
		setContentAdded(false);
		setShowAddContent(true);
		setShowAddResource(false);
	};

	return (
		<div className="flex flex-col border border-lightGray rounded-lg p-4 px-5 mt-4">
			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<h4 className="text-md font-semibold">{item.title}</h4>
					<button
						className="text-red-500"
						onClick={() => deleteLessonItem(item.id)}
					>
						Delete
					</button>
				</div>
				{!showAddContent && !showContent && !contentAdded && (
					<SecondaryButton onClick={handleAddContent} text="+ Content" />
				)}
				{(showAddContent || showContent || contentAdded) && (
					<button
						onClick={() => setShowContent(!showContent)}
					>
						{showContent ? (
							<img src={arrowup} alt="Collapse" />
						) : (
							<img src={arrowdown} alt="Expand" />
						)}
					</button>
				)}
			</div>

			{showContent && (
				<>
					{showAddContent && !contentAdded && (
						<div className="mt-4">
							<AddContentButton onContentAdded={handleContentAdded} />
						</div>
					)}

					{item.content && (
						<div className="mt-4">
							{item.content.type === "text" && (
								<TextContentItem
									text={item.content.text}
									onEdit={handleEditText}
									onDelete={handleDeleteText}
								/>
							)}
							{item.content.type === "video" && (
								<ResourceItem
									file={item.content.file}
									onDelete={handleDeleteVideo}
								/>
							)}
						</div>
					)}

					{item.content && showAddResource && (
						<div className="mt-4">
							{resources.length > 0 && (
								<div className="flex flex-col gap-2">
									{resources.map((resource, index) => (
										<ResourceItem
											key={index}
											file={resource}
											onDelete={() =>
												handleDeleteResource(resource.name)
											}
										/>
									))}
								</div>
							)}
							<div className="mt-4">
								{inputFields.length > 0 && (
									<FileInput onChange={handleResourceUpload} />
								)}
							</div>

							<SecondaryButton
								onClick={handleAddResource}
								text="+ Resources"
								className="mt-4"
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default LessonItem;
