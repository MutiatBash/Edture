import React, {
	useEffect,
	useState,
	useContext,
	useCallback,
	useRef,
	useMemo,
	memo,
} from "react";
import { userContext } from "../context/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import CourseDetailsLayout from "../layouts/CourseDetailsLayout";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import chatactive from "/icons/chat-active.svg";
import lessons from "/icons/lessons.svg";
import topics from "/icons/topics.svg";
import video from "/icons/video.svg";
import book from "/icons/book.svg";
import danger from "/icons/danger.svg";
import quiz from "/quiz.svg";
import tutor from "/tutor-profile.svg";
import certificate from "/icons/certificate.svg";
import {
	ContentModule,
	CourseModule,
} from "../components/courses/CourseModule";
import ProgressBar from "../components/ProgressBar";
import { useApi } from "../utils/customHooks";
import { SpinnerLoader } from "../components/Loader";
import { useCart } from "../context/CartContext";
import { Divider } from "../components/Dividers";
import VideoComponent from "../components/courses/VideoComponent";

const CourseContent = () => {
	const { id } = useParams();
	const {
		tutorDashboardData,
		tutorLoading,
		tutorError,
		userLoading,
		userError,
		courses: allCourses,
		token,
		user,
	} = useContext(userContext);

	const {
		data: courseContents,
		loading: courseContentsLoading,
		error: courseContentsError,
	} = useApi(`https://edture.onrender.com/users/student/courses/${id}`, token);

	const course = courseContents;
	const courseLessonsData = course?.lessons || [];

	const videoRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [expandAll, setExpandAll] = useState(false);
	const [modulesState, setModulesState] = useState({});
	const [activeTab, setActiveTab] = useState("study");
	const [selectedTopic, setSelectedTopic] = useState(null);

	const handleExpandAllClick = useCallback(() => {
		const newExpandAll = !expandAll;
		setExpandAll(newExpandAll);
		setModulesState(
			courseLessonsData?.reduce((acc, _, index) => {
				acc[index] = newExpandAll;
				return acc;
			}, {})
		);
	}, [expandAll, courseLessonsData]);

	const handleModuleToggle = useCallback((index, isOpen) => {
		setModulesState((prev) => {
			const updatedState = { ...prev, [index]: isOpen };

			const allExpanded = Object.values(updatedState).every(
				(state) => state
			);
			const anyExpanded = Object.values(updatedState).some((state) => state);

			setExpandAll(allExpanded || (!anyExpanded && false));

			return updatedState;
		});
	}, []);

	const handleTopicSelect = (topic) => {
		setSelectedTopic(topic);
	};

	const calculateTotalDuration = () => {
		let totalSeconds = 0;

		courseLessonsData?.forEach((lesson) => {
			lesson.topics.forEach((topic) => {
				if (topic.contentType === "video" && topic.videoDurationInSeconds) {
					totalSeconds += topic.videoDurationInSeconds;
				}
			});
		});

		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		return { hours, minutes };
	};

	const { hours, minutes } = calculateTotalDuration();

	const videoUrl =
		selectedTopic?.contentType === "video" ? selectedTopic.videoUrl : null;

	const textContent =
		selectedTopic?.contentType === "text" ? selectedTopic.description : null;

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current && courseLessonsData.length > 0) {
			const firstTopic = courseLessonsData[0].topics[0];
			setSelectedTopic(firstTopic);
			isFirstRender.current = false;
		}
	}, [courseLessonsData]);

	useEffect(() => {
		if (selectedTopic) {
			if (selectedTopic.contentType === "video") {
				setActiveTab("discuss");
			} else if (selectedTopic.contentType === "text") {
				setActiveTab("study");
			}
		}
	}, [selectedTopic]);

	const renderContent = () => {
		return activeTab === "study" ? (
			<div className="">
				<p className="font-trap-grotesk text-lg">{textContent}</p>
			</div>
		) : activeTab === "discuss" ? (
			<div className="flex flex-col gap-4">
				<p className="font-trap-grotesk text-lg">
					Visit the community page to browse topics and discussions. Post a
					question, start a new discussion, or join an existing
					conversation!
				</p>
				<div>
					<Link
						to={`/courses/${id}/chat`}
						className="flex gap-2 font-trap-grotesk text-primaryBlue font-medium items-center justify-start"
					>
						<img src={chatactive} alt="Chat" />
						<span className="font-trap-grotesk">Chat</span>
					</Link>
				</div>
			</div>
		) : activeTab === "resources" ? (
			courseLessonsData?.map((lesson, index) => (
				<div key={index} className="">
					{lesson.topics.map((topic, i) =>
						topic.downloadableMaterials?.map((resource, j) => (
							<div
								key={`${i}-${j}`}
								className="flex gap-4 justify-start"
							>
								<h4 className="text-lg">{topic.title}:</h4>
								<a
									className="text-primaryBlue underline font-trap-grotesk text-lg"
									href={resource.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{resource.name}
								</a>
							</div>
						))
					)}
				</div>
			))
		) : null;
	};

	return (
		<div>
			{courseContentsLoading && <SpinnerLoader />}
			<CourseDetailsLayout>
				<div className="flex px-12 justify-between">
					<div className="bg-white flex flex-col pt-8 pr-5 border-r-[0.5px] border-r-lightGray w-[30%] h-full gap-3 min-h-screen sticky top-0 bottom-0 z-20">
						<div className="flex justify-between items-center gap-4">
							<h5 className="text-lg font-trap-grotesk font-semibold">
								Course Content
							</h5>
							<SecondaryButton
								onClick={handleExpandAllClick}
								className="font-trap-grotesk text-primary text-sm"
								text={expandAll ? "Collapse" : "Expand"}
							/>
						</div>
						<div>
							{courseLessonsData?.map((lesson, index) => (
								<ContentModule
									key={index}
									lessonTitle={lesson.title}
									lessonItems={lesson.topics}
									isExpanded={modulesState[index] || false}
									onToggle={(isOpen) =>
										handleModuleToggle(index, isOpen)
									}
									onTopicSelect={handleTopicSelect}
								/>
							))}
						</div>
					</div>

					<div className="p-8 w-full">
						{videoUrl && <VideoComponent url={videoUrl} />}
						<div className="flex gap-14 items-center px-6 p-1 text-center relative">
							{!videoUrl && (
								<button
									className={`hover:text-primaryBlue font-trap-grotesk ${
										activeTab === "study" ? "text-primaryBlue" : ""
									}`}
									onClick={() => setActiveTab("study")}
								>
									Study
								</button>
							)}
							<button
								className={`hover:text-primaryBlue font-trap-grotesk ${
									activeTab === "discuss" ? "text-primaryBlue" : ""
								}`}
								onClick={() => setActiveTab("discuss")}
							>
								Discuss
							</button>
							<button
								className={`hover:text-primaryBlue font-trap-grotesk ${
									activeTab === "resources" ? "text-primaryBlue" : ""
								}`}
								onClick={() => setActiveTab("resources")}
							>
								Resources
							</button>
							<div
								className="absolute -bottom-[8.5px] rounded left-0 h-[1.5px] w-[12%] bg-primaryBlue transition-all duration-300"
								style={{
									transform: videoUrl
										? activeTab === "discuss"
											? "translateX(2%)"
											: activeTab === "resources"
											? "translateX(100%)"
											: "translateX(0)"
										: activeTab === "discuss"
										? "translateX(110%)"
										: activeTab === "resources"
										? "translateX(240%)"
										: "translateX(0)",
								}}
							></div>
						</div>
						<Divider />
						<div className="py-3 flex flex-col gap-3">
							{renderContent()}
						</div>
					</div>
				</div>
			</CourseDetailsLayout>
		</div>
	);
};

export default CourseContent;
