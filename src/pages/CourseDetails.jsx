import React, { useEffect, useState, useContext, useCallback } from "react";
import { userContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { coursesInProgress } from "../data";
import CourseDetailsLayout from "../layouts/CourseDetailsLayout";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import lessons from "/icons/lessons.svg";
import topics from "/icons/topics.svg";
import video from "/icons/video.svg";
import book from "/icons/book.svg";
import danger from "/icons/danger.svg";
import quiz from "/quiz.svg";
import tutor from "/tutor-profile.svg";
import certificate from "/icons/certificate.svg";
import verify from "/icons/verify.svg";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import CourseModule from "../components/courses/CourseModule";
import ProgressBar from "../components/ProgressBar";
import { useApi } from "../utils/customHooks";
import { SpinnerLoader } from "../components/Loader";

const CourseDetails = () => {
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
		data: courseDetails,
		loading: courseDetailsLoading,
		error: courseDetailsError,
	} = useApi(`https://edture.onrender.com/courses/${id}`, token);

	console.log("coursedetails here", courseDetails);

	const course = courseDetails || coursesInProgress.find((c) => c.id === id);
	const courseLessonsData = course?.lessons || [];
	const recommendedCourses = allCourses?.courses?.slice(0, 4);
	console.log("rec", recommendedCourses);

	console.log("courselessons here", courseLessonsData);

	console.log("Found Course:", course);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const isTutor = user?.role === "TUTOR";

	return (
		<>
			{courseDetailsLoading && <SpinnerLoader />}
			{courseDetailsError && <p>{courseDetailsError}</p>}
			<CourseDetailsLayout>
				{isTutor ? (
					<TutorHeader selectedCourse={course} />
				) : (
					<StudentHeader selectedCourse={course} />
				)}
				{isTutor ? (
					<TutorContent selectedCourse={courseLessonsData} />
				) : (
					<StudentContent
						selectedCourse={courseLessonsData}
						recommendedCourse={recommendedCourses}
					/>
				)}
			</CourseDetailsLayout>
		</>
	);
};

const StudentHeader = ({ selectedCourse }) => (
	<div className="bg-darkBlue text-white pt-8 font-trap-grotesk">
		<div className="flex relative container-wrapper font-trap-grotesk">
			<div className="w-3/5 flex flex-col p-12">
				<h1 className="font-bold text-5xl mb-4">{selectedCourse?.title}</h1>
				<p className="font-trap-grotesk text-sm mb-2 whitespace-pre-line">
					{selectedCourse?.description}
				</p>
				<div className="flex gap-2 mb-2">
					<div className="flex gap-1 items-center">
						<img src={selectedCourse?.ratings} alt="Ratings" />
						<span className="font-trap-grotesk">4.5 •</span>
					</div>
					<span className="font-trap-grotesk">
						Last updated: {selectedCourse?.lastUpdated} •
					</span>
					{selectedCourse?.certificateAvailable && (
						<span className="font-trap-grotesk">
							Certificate available
						</span>
					)}
				</div>
				<div>
					<p className="font-trap-grotesk text-sm mb-2">
						Instructor: {selectedCourse?.instructorName}
					</p>
				</div>
			</div>
			<CourseModal
				course={selectedCourse}
				courseInProgress={selectedCourse}
			/>
		</div>
	</div>
);

const TutorHeader = ({ selectedCourse }) => (
	<div className="bg-darkBlue text-white pt-8 font-trap-grotesk">
		<div className="flex relative container-wrapper font-trap-grotesk">
			<div className="w-3/5 flex flex-col p-12">
				<h1 className="font-bold text-5xl mb-4">{selectedCourse?.title}</h1>
				<p className="font-trap-grotesk text-sm mb-2 whitespace-pre-line">
					{selectedCourse?.description}
				</p>
				<div className="flex gap-2 mb-2">
					<div className="flex gap-1 items-center">
						<img src={selectedCourse?.ratings} alt="Ratings" />
						<span className="font-trap-grotesk">4.5 •</span>
					</div>
					<span className="font-trap-grotesk">
						Last updated: {selectedCourse?.lastUpdated} •
					</span>
					{selectedCourse?.certificateAvailable && (
						<span className="font-trap-grotesk">
							Certificate available
						</span>
					)}
				</div>
				<div>
					<p className="font-trap-grotesk text-sm mb-2">
						Instructor: {selectedCourse?.instructorName}
					</p>
				</div>
			</div>
		</div>
	</div>
);

const StudentContent = ({ selectedCourse, recommendedCourse }) => {
	const [expandAll, setExpandAll] = useState(false);
	const [modulesState, setModulesState] = useState({});

	const handleExpandAllClick = useCallback(() => {
		const newExpandAll = !expandAll;
		setExpandAll(newExpandAll);
		setModulesState(
			selectedCourse.reduce((acc, _, index) => {
				acc[index] = newExpandAll;
				return acc;
			}, {})
		);
	}, [expandAll, selectedCourse]);

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

		selectedCourse?.forEach((lesson) => {
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

	return (
		<>
			<div className="flex flex-col gap-10 py-8 pl-14 w-3/5">
				<div className="font-trap-grotesk">
					<div className="flex flex-col gap-3 border border-lightGray rounded-lg p-4 text-darkGray">
						<p className="text-xl font-trap-grotesk">What you'll learn</p>
						{/* <div className="grid grid-cols-2 gap-3">
						{selectedCourse?.learnings?.map((learning, index) => (
							<div key={index} className="flex gap-3 items-start">
								<img src={verify} alt="Verify Icon" />
								{learning}
							</div>
						))}
					</div> */}
					</div>
				</div>
				<div>
					<h5 className="text-xl font-trap-grotesk font-semibold">
						Course Content
					</h5>
					<div className="flex flex-col gap-3">
						<div className="flex justify-between items-center">
							<div>
								<span className="font-trap-grotesk">
									{selectedCourse?.length} Lessons •
								</span>
								<span className="font-trap-grotesk">
									{" "}
									{selectedCourse?.reduce(
										(acc, lesson) => acc + lesson.topics.length,
										0
									)}{" "}
									Topics •
								</span>
								<span className="font-trap-grotesk">
									{" "}
									{hours > 0 ? `${hours}h ` : ""}
									{minutes}m total length
								</span>
							</div>
							<SecondaryButton
								onClick={handleExpandAllClick}
								className="font-trap-grotesk text-primary"
								text={expandAll ? "Collapse All" : "Expand All"}
							/>
						</div>
						<div>
							{selectedCourse?.map((lesson, index) => (
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
				</div>
			</div>
			<RecommendedCourses
				courses={recommendedCourse}
				styleClass="px-12 py-10"
				heading={"Similar Courses"}
			/>
		</>
	);
};

const TutorContent = ({ selectedCourse }) => {
	const [expandAll, setExpandAll] = useState(false);
	const [modulesState, setModulesState] = useState({});

	const handleExpandAllClick = useCallback(() => {
		const newExpandAll = !expandAll;
		setExpandAll(newExpandAll);
		setModulesState(
			selectedCourse.reduce((acc, _, index) => {
				acc[index] = newExpandAll;
				return acc;
			}, {})
		);
	}, [expandAll, selectedCourse]);

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

		selectedCourse?.forEach((lesson) => {
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

	return (
		<div className="flex flex-col gap-10 py-8 pl-14 w-3/5">
			<div className="font-trap-grotesk">
				<div className="flex flex-col gap-3 border border-lightGray rounded-lg p-4 text-darkGray">
					<h4 className="text-xl font-trap-grotesk font-semibold">
						Manage Your Course
					</h4>
					<div className="grid grid-cols-2 gap-3">
						<div className="flex gap-2 items-center">
							<img src={lessons} alt="Lessons Icon" className="w-5" />
							<p>Edit Lessons</p>
						</div>
						<div className="flex gap-2 items-center">
							<img src={video} alt="Video Icon" className="w-5" />
							<p>Upload Videos</p>
						</div>
						<div className="flex gap-2 items-center">
							<img src={quiz} alt="Quiz Icon" className="w-5" />
							<p>Create Quizzes</p>
						</div>
						<div className="flex gap-2 items-center">
							<img
								src={certificate}
								alt="Certificate Icon"
								className="w-5"
							/>
							<p>Manage Certificates</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h5 className="text-xl font-trap-grotesk font-semibold">
					Course Content
				</h5>
				<div className="flex flex-col gap-3">
					<div className="flex justify-between items-center">
						<div>
							<span className="font-trap-grotesk">
								{selectedCourse?.length} Lessons •
							</span>
							<span className="font-trap-grotesk">
								{" "}
								{selectedCourse?.reduce(
									(acc, lesson) => acc + lesson.topics.length,
									0
								)}{" "}
								Topics •
							</span>
							<span className="font-trap-grotesk">
								{" "}
								{hours > 0 ? `${hours}h ` : ""}
								{minutes}m total length
							</span>
						</div>
						<SecondaryButton
							onClick={handleExpandAllClick}
							className="font-trap-grotesk text-primary"
							text={expandAll ? "Collapse All" : "Expand All"}
						/>
					</div>
					<div>
						{selectedCourse?.map((lesson, index) => (
							<CourseModule
								key={index}
								lessonTitle={lesson.title}
								lessonItems={lesson.topics}
								isExpanded={modulesState[index] || false}
								onToggle={(isOpen) => handleModuleToggle(index, isOpen)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const CourseModal = ({ course, courseInProgress }) => {
	return (
		<div className="fixed max-h-[40rem] top-32 bottom-5 right-14 p-4 w-full max-w-[400px] bg-white shadow-lg z-20 rounded-lg font-trap-grotesk">
			<div className="h-[200px]">
				<img
					src={course?.image || courseInProgress?.image}
					className="w-full h-full mb-4 object-cover rounded-md"
					alt="Course"
				/>
			</div>
			{courseInProgress?.progress ? (
				<div className="py-4 flex flex-col gap-2">
					<ProgressBar progress={courseInProgress?.progress} />
					<p className="font-trap-grotesk text-lightGray text-sm">
						{courseInProgress?.progress}% complete
					</p>
					<PrimaryButton text={"Resume Learning"} className="w-full" />
					<div className="border rounded-md text-primaryBlack text-sm flex gap-3 items-center border-lightGray">
						<img
							src={danger}
							className="bg-warning p-2 rounded-tl rounded-bl"
						/>
						<span className="font-trap-grptesk text-primaryBlack opacity-80">
							Complete all lessons to get your certificate
						</span>
					</div>
				</div>
			) : (
				<>
					<p className="font-semibold text-2xl pt-2 text-primaryBlack font-trap-grotesk">
						{course?.price || courseInProgress?.price}{" "}
						<span className="text-lightGray line-through font-normal">
							{course?.originalPrice || courseInProgress?.originalPrice}
						</span>
					</p>
					<div className="flex flex-col gap-4 py-2">
						<PrimaryButton text={"Add to cart"} className="w-full" />
						<SecondaryButton text={"Buy Now"} className="w-full" />
					</div>
				</>
			)}
			<div className="text-primaryBlack py-2">
				<h5 className="font-bold font-trap-grotesk text-lg">
					Course includes:
				</h5>
				<div className="flex flex-col gap-2 py-2 text-sm">
					<div className="flex gap-5 w-4/5 justify-start">
						<div className="inline-flex gap-3 items-center">
							<img src={lessons} className="w-4 h-4" />
							{course?.lectures || courseInProgress?.lectures} lessons
						</div>
						<div className="flex gap-3">
							<img src={topics} className="w-4 h-4" />
							{course?.lectures || courseInProgress?.lectures} courses
						</div>
					</div>
					<div className="flex gap-5 w-4/5 justify-start">
						<div className="flex gap-3">
							<img src={video} className="w-4 h-4" />
							Video content
						</div>
						<div className="flex gap-3">
							<img src={book} className="w-4 h-4" />
							Reading
						</div>
					</div>
					<div className="flex gap-3">
						<img src={quiz} className="w-4 h-4" />
						Quizzes
					</div>
					<div className="flex gap-3">
						<img src={certificate} className="w-4 h-4" />
						Certificate of completion
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetails;
