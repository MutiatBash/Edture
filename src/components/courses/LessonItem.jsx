import React, { useState, useEffect } from "react";
import { IconButton, PrimaryButton, SecondaryButton } from "../Button";
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
import { InputField } from "../inputs/CourseCreationInputs";
import { Divider } from "../Dividers";

const FileInput = ({ onChange, note }) => {
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState("");

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const url = URL.createObjectURL(selectedFile);
			setFile(selectedFile);
			setFileUrl(url);

			onChange({
				file: selectedFile,
				type: "pdf",
				name: selectedFile.name,
				url,
			});
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center relative pl-5 border border-lightGray rounded-lg">
				<span className="text-lightGray">No file selected</span>
				<label className="flex items-center cursor-pointer">
					<div className="border p-4 px-5 rounded-tr-md rounded-br-md border-primaryBlue">
						<input
							type="file"
							accept=".pdf"
							onChange={handleFileChange}
							className="absolute right-0 hidden"
						/>
						<span className="text-primaryBlue font-medium font-trap-grotesk">
							Select file
						</span>
					</div>
				</label>
			</div>
			<p className="text-lightGray pt-2">
				<span className="font-semibold">Note: </span>
				{note}
			</p>
		</div>
	);
};

const VideoInput = ({ onChange, note }) => {
	const [videoFile, setVideoFile] = useState(null);
	const [videoUrl, setVideoUrl] = useState("");
	const [videoDuration, setVideoDuration] = useState(0);

	const handleVideoChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setVideoFile(file);
			setVideoUrl(url);

			const videoElement = document.createElement("video");
			videoElement.src = url;
			videoElement.onloadedmetadata = () => {
				setVideoDuration(videoElement.duration);
				onChange({
					file,
					url,
					duration: videoElement.duration,
				});
			};
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center relative pl-5 border border-lightGray rounded-lg">
				<span className="text-lightGray">No file selected</span>
				<label className="flex items-center cursor-pointer">
					<div className="border p-4 px-5 rounded-tr-md rounded-br-md border-primaryBlue">
						<input
							type="file"
							accept="video/*"
							onChange={handleVideoChange}
							className="absolute right-0 hidden"
						/>
						<div className="flex gap-2 items-center">
							<img src={videoicon} alt="Video Icon" />
							<span className="text-primaryBlue font-medium font-trap-grotesk">
								Select Video
							</span>
						</div>
					</div>
				</label>
			</div>
			<p className="text-lightGray pt-2">
				<span className="font-semibold">Note: </span>
				{note}
			</p>
		</div>
	);
};

const ResourceItem = ({ file, onDelete }) => (
	<div className="flex justify-between items-center border border-dashed border-lightGray rounded-lg p-3 w-full">
		<div className="flex gap-2 items-center">
			<img src={documentfile} />
			<p className="text-lightGray">{file.name}</p>
		</div>
		<button
			className="text-primaryBlue border border-primaryBlue p-1 rounded"
			onClick={onDelete}
		>
			<img src={deleteicon} />
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
					<div className="flex gap-2">
						<button className="" onClick={handleEdit}>
							<img src={editicon} />
						</button>
						<button className="" onClick={onDelete}>
							<img src={deleteicon} />
						</button>
					</div>
				</>
			) : (
				<>
					<p>{text}</p>
					<div className="flex gap-2">
						<button className="">
							<img src={editicon} />
						</button>
						<button className="" onClick={onDelete}>
							<img src={deleteicon} />
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export const AddTopicInput = ({ addTopic, onCancel }) => {
	const [topicTitle, setTopicTitle] = useState("");

	const handleAdd = () => {
		if (topicTitle) {
			addTopic({ id: Date.now(), topicTitle, content: null });
			setTopicTitle("");
			onCancel();
		}
	};

	const handleChange = (e) => {
		setTopicTitle(e.target.value);
	};

	return (
		<div className="flex flex-col gap-2">
			<h4 className="font-medium text-lg">New Topic:</h4>
			<InputField
				type="text"
				placeholder="Enter title"
				value={topicTitle}
				onChange={handleChange}
				className="border border-lightGray rounded-lg p-4 px-5"
			/>
			<div className="flex gap-2 self-end">
				<PrimaryButton onClick={handleAdd} text="Add topic" />
				<SecondaryButton onClick={onCancel} text="Cancel" />
			</div>
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
	const [videoUrl, setVideoUrl] = useState("");
	const [videoDuration, setVideoDuration] = useState(0);

	const handleAddText = () => {
		if (text) {
			onContentAdded({
				type: "text",
				text,
			});
			resetState();
		}
	};

	const handleFileChange = (videoDetails) => {
		const { file, url, duration } = videoDetails;
		setFile(file);
		setVideoUrl(url);
		setVideoDuration(duration);
		onContentAdded({
			type: "video",
			file,
			url,
			duration,
		});
		resetState();
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
		setVideoUrl("");
		setVideoDuration(0);
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
								<PrimaryButton onClick={handleAddText} text="Save" />
								<SecondaryButton onClick={handleCancel} text="Cancel" />
								{existingContent && (
									<div className="flex gap-2">
										<button className="">
											<img src={editicon} />
										</button>
										<button
											className=""
											onClick={handleDeleteContent}
										>
											<img src={deleteicon} />
										</button>
									</div>
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
								<VideoInput
									onChange={handleFileChange}
									note={"File requirements: 720p minimum, max 1.0 GB"}
								/>
							)}
						</div>
					)}
				</div>
			) : (
				<div className="flex gap-2 mt-4 justify-center">
					<IconButton
						onClick={() => {
							setShowInput(true);
							setContentType("text");
						}}
						text="Text"
						className="border-primaryBlue"
						icon={texticon}
					/>
					<IconButton
						onClick={() => {
							setShowInput(true);
							setContentType("video");
						}}
						text="Video"
						icon={videoicon}
					/>
				</div>
			)}
		</div>
	);
};

export const LessonItem = ({ item, updateLessonItem, deleteLessonItem }) => {
	const [showAddContent, setShowAddContent] = useState(false);
	const [showAddResource, setShowAddResource] = useState(
		item.content ? true : false
	);
	const [contentAdded, setContentAdded] = useState(
		item.content ? true : false
	);
	const [showContent, setShowContent] = useState(false);
	const [file, setFile] = useState(null);
	const [inputFields, setInputFields] = useState([]);
	const [resources, setResources] = useState(item.resources || []);

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

	const handleResourceUpload = ({ type, name, url }) => {
		setResources((prevResources) => [...prevResources, { type, name, url }]);
	};
	// const handleResourceUpload = (e) => {
	// 	const uploadedFile = e.target.files[0];
	// 	if (uploadedFile) {
	// 		const url = URL.createObjectURL(uploadedFile);
	// 		if (uploadedFile) {
	// 			const url = URL.createObjectURL(uploadedFile);
	// 			const newResource = {
	// 				type: "pdf",
	// 				name: uploadedFile.name,
	// 				url: url,
	// 			};
	// 			const updatedResources = [...resources, newResource];
	// 			setResources(updatedResources);
	// 			e.target.value = null;
	// 		}
	// 	}
	// };
	console.log(resources);
	// const handleResourceUpload = (e) => {
	// 	const uploadedFile = e.target.files[0];
	// 	if (uploadedFile) {
	// 		const url = URL.createObjectURL(uploadedFile);
	// 		setResources((prevResources) => [
	// 			...prevResources,
	// 			{
	// 				type: "pdf",
	// 				name: uploadedFile.name,
	// 				url: url,
	// 			},
	// 		]);
	// 		e.target.value = null;
	// 	}
	// };

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

	 useEffect(() => {
			setResources(item.resources || []);
			setShowAddResource(item.content && item.resources?.length);
		}, [item.resources]);

	return (
		<div className="flex flex-col border border-lightGray rounded-lg p-4 mt-4">
			<div className="flex justify-between items-center">
				<div className="flex gap-3 items-center">
					<h4 className="text-lg font-semibold">
						Topic {item?.index + 1}:
					</h4>
					<div className="flex gap-2 items-center">
						<img src={documenttext} />
						<h4 className="text-md">{item?.topicTitle}</h4>
					</div>
					<div className="flex gap-2 items-center">
						<button className="">
							<img src={editicon} />
						</button>
						<button
							className=""
							onClick={() => deleteLessonItem(item?.id)}
						>
							<img src={deleteicon} />
						</button>
					</div>
				</div>
				{!showAddContent && !showContent && !contentAdded && (
					<SecondaryButton
						onClick={handleAddContent}
						text="Content"
						icon={addicon}
						className="flex gap-2"
					/>
				)}
				{(showAddContent || showContent || contentAdded) && (
					<button onClick={() => setShowContent(!showContent)}>
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
					<Divider />

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

					{item.content && showContent && showAddResource && (
						<div className="mt-4">
							{resources && (
								<div className="flex flex-col gap-3">
									<h3 className="font-semibold text-lg">
										Downloadable materials
									</h3>
									<div className="flex flex-col gap-2">
										{resources?.map((resource, index) => (
											<ResourceItem
												key={index}
												file={resource}
												onDelete={() =>
													handleDeleteResource(resource.name)
												}
											/>
										))}
									</div>
								</div>
							)}
							<div className="mt-4">
								{inputFields.length > 0 && (
									<FileInput
										onChange={handleResourceUpload}
										note={
											"A resource refers to any document that supports student learning in the lecture. This file will be treated as supplementary material, so ensure it's clear and concise. Please keep the file size under 1 GB to facilitate easy access."
										}
									/>
								)}
							</div>

							<SecondaryButton
								onClick={handleAddResource}
								text="Resources"
								className="mt-4 flex"
								icon={addicon}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};
