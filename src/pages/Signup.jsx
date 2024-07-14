import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StudentSignup from "./StudentSignup";
import TutorSignup from "./TutorSignup";

const SignUp = () => {
	const location = useLocation();
	const [role, setRole] = useState("STUDENT");

	useEffect(() => {
		if (location.state?.role) {
			setRole(location.state.role);
		}
	}, [location.state]);

	return (
		<section>
			{role === "STUDENT" && <StudentSignup setRole={setRole} />}
			{role === "TUTOR" && <TutorSignup setRole={setRole} />}
		</section>
	);
};

export default SignUp;
