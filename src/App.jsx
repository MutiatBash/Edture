import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/StudentDashboard";
import Inbox from "./pages/Inbox";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import StudentSignin from "./pages/StudentSignin";
import TutorSignin from "./pages/TutorSignin";
import StudentSignup from "./pages/StudentSignup";
import TutorSignup from "./pages/TutorSignup";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import InactivityTimeout from "./pages/Timeout";
import Cart from "./pages/Cart";

const App = () => {
	return (
		<div className="mx-auto container-wrapper">
			<Router>
				<InactivityTimeout />
				<Routes>
					<Route path="/student-signin" element={<StudentSignin />} />
					<Route path="/student-signup" element={<StudentSignup />} />
					<Route path="/tutor-signin" element={<TutorSignin />} />
					<Route path="/tutor-signup" element={<TutorSignup />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route
						path="/student-dashboard"
						element={<StudentDashboard />}
					/>
					<Route path="/tutor-dashboard" element={<TutorDashboard />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/course/:id" element={<CourseDetails />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
