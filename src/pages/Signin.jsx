import React, { useState } from "react";
import TutorSignin from "../components/authentication/TutorSignin";
import StudentSignin from "../components/authentication/StudentSignin";

const SignIn = () => {
	const [role, setRole] = useState("STUDENT");

	return (
		<section>
			{role === "STUDENT" && <StudentSignin setRole={setRole} />}
			{role === "TUTOR" && <TutorSignin setRole={setRole} />}
		</section>
	);
};

export default SignIn;
