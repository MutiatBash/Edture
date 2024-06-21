import React, { useState } from "react";
import TutorSignin from "../components/TutorSignin";
import StudentSignin from "../components/StudentSignin";

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
