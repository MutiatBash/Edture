import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import GoogleAuth from "./pages/GoogleAuth";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

const App = () => {
	return (
		<div className="mx-auto content-wrapper">
			<Router>
				<Routes>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/google-auth" element={<GoogleAuth />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/inbox" element={<Inbox />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/course/:id" element={<CourseDetails />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
