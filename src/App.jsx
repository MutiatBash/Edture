import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// App.js or index.js
import '@fortawesome/fontawesome-free/css/all.css';
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</Router>
	);
};

export default App;
