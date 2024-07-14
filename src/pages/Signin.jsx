import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSignin from "./StudentSignin";
import TutorSignin from "./TutorSignin";

const SignIn = () => {
	const navigate = useNavigate();
	const [role, setRole] = useState("STUDENT");

	const handleSignUpNavigation = () => {
		navigate("/signup", { state: { role } });
	};

	return (
		<section>
			{role === "STUDENT" && (
				<StudentSignin
					setRole={setRole}
					navigateToSignUp={handleSignUpNavigation}
				/>
			)}
			{role === "TUTOR" && (
				<TutorSignin
					setRole={setRole}
					navigateToSignUp={handleSignUpNavigation}
				/>
			)}
		</section>
	);
};

export default SignIn;
