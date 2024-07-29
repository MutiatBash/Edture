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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import AllCourses from "./pages/AllCourses";
import CourseContent from "./pages/CourseContent";
import { SessionTimeoutModal } from "./components/popups/Modal";
import { useSessionTimeout } from "./utils/customHooks";
import Chat from "./pages/Chat";

const App = () => {
	const { isTimeoutModal, handleCloseModal } = useSessionTimeout();

	return (
		<div className="mx-auto container-wrapper">
			<Router>
				<InactivityTimeout />
				<SessionTimeoutModal
					isOpen={isTimeoutModal}
					onClose={handleCloseModal}
				/>
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
					<Route path="/courses/:id" element={<CourseDetails />} />
					<Route
						path="/courses/course-content/:id"
						element={<CourseContent />}
					/>
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/allcourses" element={<AllCourses />} />
					<Route path="/courses/:id/chat" element={<Chat />} />
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
};

export default App;
