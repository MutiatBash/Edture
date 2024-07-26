import { useEffect, useState, useContext } from "react";
import { userContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import {  coursesInProgress } from "../data";
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

const CourseDetails = () => {
	const { id } = useParams();
	const {
		tutorDashboardData,
		tutorLoading,
		tutorError,
		userLoading,
		userError,
		setShowLogoutModal,
		showLogoutModal,
		logout,
		isLoggingOut,
		token,
		user,
	} = useContext(userContext);

	console.log("URL Parameter ID:", id);

	const coursesData = tutorDashboardData?.courses || [];
	console.log("Courses Data:", coursesData);

	const courseModulesData = coursesData?.flatMap((course) =>
		course.lessons.map((lesson) => ({
			title: lesson.title,
			topics: lesson.topics,
		}))
	);


	const course = coursesData.find((course) => course.id === id);
	console.log("Found Course:", course);

	const courseInProgress = coursesInProgress.find(
		(c) => c.id === id
	);

	const [expandAll, setExpandAll] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!course && !courseInProgress) {
		return <div>Course not found</div>;
	}

	const handleExpandAllClick = () => {
		setExpandAll(!expandAll);
	};

	const selectedCourse = course || courseInProgress;

	return (
		<CourseDetailsLayout>
			<div className="bg-darkBlue text-white pt-8 font-trap-grotesk">
				<div className="flex relative container-wrapper font-trap-grotesk">
					<div className="w-3/5 flex flex-col p-12">
						<h1 className="font-bold text-5xl mb-4">
							{selectedCourse?.title}
						</h1>
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
						course={course}
						courseInProgress={courseInProgress}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-10 py-8 pl-14 w-3/5">
				<div className="font-trap-grotesk">
					<div className="flex flex-col gap-3 border border-lightGray rounded-lg p-4 text-darkGray">
						<p className="text-xl font-trap-grotesk">What you'll learn</p>
						<div className="grid grid-cols-2 gap-3">
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
							<div className="flex gap-3 items-start">
								<img src={verify} />
								Understand the fundamentals of Artificial Intelligence
							</div>
						</div>
					</div>
				</div>

				<div className="">
					<h5 className="text-xl font-trap-grotesk font-semibold">
						Course Content
					</h5>
					<div>
						<div className="flex justify-between items-center">
							<div>
								<span className="font-trap-grotesk">9 Lessons •</span>
								<span className="font-trap-grotesk"> 33 Topics •</span>
								<span className="font-trap-grotesk">
									{" "}
									3h 00m total length
								</span>
							</div>
							<SecondaryButton
								text={
									expandAll
										? "Collapse all lessons"
										: "Expand all lessons"
								}
								onClick={handleExpandAllClick}
							/>
						</div>
						<div className="py-4">
							{courseModulesData?.map((module, index) => (
								<CourseModule
									key={index}
									moduleTitle={module.title}
									submodules={module.topics}
									expandAll={expandAll}
								/>
							))}
						</div>
					</div>
				</div>

				{/* REQUIREMENTS */}
				<div className="">
					<h5 className="text-xl font-trap-grotesk font-semibold">
						Requirements
					</h5>
					<div className="flex flex-col gap-3">
						<div>
							<p>Laptop or desktop with:</p>
							<ul className="list-disc pl-6 text-sm">
								<li>Windows 10 or later</li>
								<li>MacOS</li>
								<li>Linux</li>
							</ul>
						</div>
						<div>
							<p>Laptop or desktop with:</p>
							<ul className="list-disc pl-6 text-sm">
								<li>Windows 10 or later</li>
								<li>MacOS</li>
								<li>Linux</li>
							</ul>
						</div>
						<div>
							<p>Laptop or desktop with:</p>
							<ul className="list-disc pl-6 text-sm">
								<li>Windows 10 or later</li>
								<li>MacOS</li>
								<li>Linux</li>
							</ul>
						</div>
						<div>
							<p>Laptop or desktop with:</p>
							<ul className="list-disc pl-6 text-sm">
								<li>Windows 10 or later</li>
								<li>MacOS</li>
								<li>Linux</li>
							</ul>
						</div>
					</div>
				</div>

				<div>
					<h5 className="text-xl font-semibold font-trap-grotesk">
						About Instructor
					</h5>
					<div className="flex gap-3 items-center py-2">
						<div className="w-[8%]">
							<img src={tutor} className="w-full" />
						</div>
						<div>
							<h5 className="font-trap-grotesk font-semibold">
								{selectedCourse?.provider}
							</h5>
							<p className="font-trap-grotesk">
								By harnessing the power of technology
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="pl-14 pb-12">
				{/* <h5>Related Courses</h5> */}
				<RecommendedCourses
					heading={"Related Courses"}
					course={course}
					className="max-w-[1200px]"
				/>
			</div>
		</CourseDetailsLayout>
	);
};

export default CourseDetails;

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
