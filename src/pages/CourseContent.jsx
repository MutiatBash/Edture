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
import { coursesInProgress } from "../data";
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
import CourseModule from "../components/courses/CourseModule";
import ProgressBar from "../components/ProgressBar";
import { useApi } from "../utils/customHooks";
import { SpinnerLoader } from "../components/Loader";
import { useCart } from "../context/CartContext";
import { Divider } from "../components/Dividers";
import ReactPlayer from "react-player";
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
	} = useApi(`https://edture.onrender.com/courses/${id}`, token);

	const course = courseContents || coursesInProgress.find((c) => c.id === id);
	const courseLessonsData = course?.lessons || [];

	const videoRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [expandAll, setExpandAll] = useState(false);
	const [modulesState, setModulesState] = useState({});
	const [activeTab, setActiveTab] = useState("study");

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

	// const videoContent = courseLessonsData.flatMap((lesson) =>
	// 	lesson.topics.filter((topic) => topic.contentType === "video")
	// );

	const videoUrl = courseLessonsData
		?.flatMap((lesson) => lesson.topics)
		.find((topic) => topic.contentType === "video")?.videoUrl;

	const textContent = courseLessonsData.flatMap((lesson) =>
		lesson.topics.filter((topic) => topic.contentType === "text")
	);

	// const VideoContent = React.memo(() => {
	// 	return (
	// 		<div className="">
	// 			{videoContent.map((topic, i) => (
	// 				<div key={i}>
	// 					<h4>{topic.title}</h4>
	// 					<div className="w-full py-6">
	// 						<video
	// 							ref={videoRef}
	// 							controls
	// 							className="w-full rounded-lg"
	// 							key={topic.videoUrl}
	// 							src={topic.videoUrl}
	// 						></video>
	// 					</div>
	// 				</div>
	// 			))}
	// 		</div>
	// 	);
	// });

	// const VideoPlayer = React.memo(({ src, play = false }) => {
	// 	const ref = useRef(null);

	// 	useEffect(() => {
	// 		if (ref.current) {
	// 			if (play) {
	// 				ref.current.play();
	// 			} else {
	// 				ref.current.pause();
	// 			}
	// 		}
	// 	}, [play, src]); // Ensure dependencies include `play` and `src`

	// 	return <video ref={ref} src={src} loop playsInline />;
	// });

	const VideoComponent = React.memo(function MyVideoComponent({ url }) {
		return (
			<div className="w-full py-6">
				<video
					controls
					className="w-full rounded-lg"
					src={url}
					type="video/mp4"
				></video>
			</div>
		);
	});

	// const VideoComponent = ({ url }) => {
	// 		return (
	// 			<div className="w-full py-6">
	// 				<ReactPlayer
	// 					url={url}
	// 					controls={true}
	// 					width="100%"
	// 					height="auto"
	// 				/>
	// 			</div>
	// 		);
	// 	};

	// const videoUrl = useMemo(() => videoContent?.videoUrl, [videoContent]);

	const TextContent = ({ textContent }) => {
		return (
			<div className="">
				{textContent.map((topic, i) => (
					<div key={i}>
						<h4>{topic.title}</h4>
						<p>{topic.content}</p>
					</div>
				))}
			</div>
		);
	};

	const renderContent = () => {
		return activeTab === "study" ? (
			<TextContent textContent={textContent} />
		) : activeTab === "discuss" ? (
			<div className="flex flex-col gap-4">
				<p className="font-trap-grotesk">
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
				<div key={index}>
					{lesson.topics.map((topic, i) =>
						topic.resources?.map((resource, j) => (
							<div key={`${i}-${j}`}>
								<h4>{topic.title}</h4>
								<a
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

	// const hasVideoContent = videoContent.length > 0;

	return (
		<div>
			{courseContentsLoading && <SpinnerLoader />}
			{courseContentsError && <p>{courseContentsError}</p>}
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
								<CourseModule
									key={index}
									lessonTitle={lesson.title}
									lessonItems={lesson.topics}
									isExpanded={modulesState[index] || false}
									onToggle={(isOpen) =>
										handleModuleToggle(index, isOpen)
									}
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
								className="absolute -bottom-[8.5px] rounded left-0 h-[1.5px] w-[10%] bg-primaryBlue transition-all duration-300"
								style={{
									transform: videoUrl
										? activeTab === "discuss"
											? "translateX(2%)"
											: "translateX(135%)"
										: activeTab === "study"
										? "translateX(0%)"
										: activeTab === "discuss"
										? "translateX(110%)"
										: "translateX(240%)",
								}}
							></div>
						</div>
						<Divider />
						<div className="py-3">{renderContent()}</div>
					</div>
				</div>
			</CourseDetailsLayout>
		</div>
	);
};

export default CourseContent;
