import React, { useState } from "react";
import StudentSignup from "../components/authentication/StudentSignup";
import TutorSignup from "../components/authentication/TutorSignup";

const SignUp = () => {
	const [role, setRole] = useState("STUDENT");

	return (
		<section>
			{role === "STUDENT" && <StudentSignup setRole={setRole} />}
			{role === "TUTOR" && <TutorSignup setRole={setRole} />}
		</section>
	);
};

export default SignUp;
