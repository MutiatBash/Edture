import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// App.js or index.js
import '@fortawesome/fontawesome-free/css/all.css';
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
};

export default App;
