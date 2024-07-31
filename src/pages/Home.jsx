import React from "react";
import Navbar from "../components/courses/Navbar";
import CourseFooter from "../components/courses/CourseFooter";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const handleSignIn = () => {
		navigate("/student-signin");
	};

	const handleSignUp = () => {
		navigate("/student-signup");
	};
	return (
		<div className="flex flex-col w-full min-h-screen">
			<Navbar />
			<div className="flex flex-col flex-grow px-8 py-12">
				<div
					className="bg-darkBlue p-16 py-24 rounded-lg flex flex-col justify-center items-center gap-5 text-white"
					style={{ backgroundImage: "url('/course-banner.svg')" }}
				>
					<div className="rounded-full p-3 px-6 border border-lighterGray bg-[#222B80]">
						Discover, Learn and Master 💡
					</div>
					<h2 className="font-trap-grotesk text-7xl font-semibold text-white text-center w-[60%] mx-auto">
						Empower your future with emerging technologies.
					</h2>
					<p className="text-xl text-white font-trap-grotesk">
						Tailored courses for educators and learners.
					</p>
					<div className="flex gap-3 justify-center items-center">
						<PrimaryButton
							text={"Start Learning"}
							className="w-full whitespace-nowrap"
							onClick={handleSignUp}
						/>
						<SecondaryButton
							text={"Sign in"}
							className="w-full whitespace-nowrap text-white"
							onClick={handleSignIn}
						/>
					</div>
				</div>
			</div>
			<CourseFooter />
		</div>
	);
};

export default Home;
