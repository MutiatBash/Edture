import React, { createContext, useState, useEffect } from "react";
import useApi from "../utils/customHooks";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("authToken"));
	const [user, setUser] = useState(null);
	const [dashboardData, setDashboardData] = useState(null);
	const [courses, setCourses] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useApi("https://edture.onrender.com/users/profiles/my-profile", token);

	const {
		data: allCourses,
		loading: allCoursesLoading,
		error: allCoursesError,
	} = useApi("https://edture.onrender.com/courses", token);

	const {
		data: tutorDashboardData,
		loading: tutorLoading,
		error: tutorError,
	} = useApi("https://edture.onrender.com/users/tutor/dashboard", token);

	const {
		data: studentDashboardData,
		loading: studentLoading,
		error: studentError,
	} = useApi("https://edture.onrender.com/users/dashboard/student", token);

	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
	}, [userData]);

	useEffect(() => {
		if (tutorDashboardData) {
			setDashboardData(tutorDashboardData);
		}
	}, [tutorDashboardData]);

	useEffect(() => {
		if (allCourses) {
			setCourses(allCourses);
		}
	}, [allCourses]);

	useEffect(() => {
		if (studentDashboardData) {
			setDashboardData(studentDashboardData);
		}
	}, [studentDashboardData]);

	useEffect(() => {
		if (token) {
			localStorage.setItem("authToken", token);
		} else {
			localStorage.removeItem("authToken");
		}
	}, [token]);

	useEffect(() => {
		if (userError || tutorError || studentError) {
			setError(userError || tutorError || studentError);
		} else {
			setError("");
		}
	}, [userError, tutorError, studentError]);

	const logout = async () => {
		setIsLoggingOut(true);
		try {
			console.log("Logging out...");
			setTimeout(() => {
				localStorage.removeItem("authToken");
				setUser(null);
				setDashboardData(null);
				setToken(null);
				setError("");
				setSuccess(true);
				console.log("States cleared");
			}, 1000);
		} catch (error) {
			console.error("Error during logout:", error);
			setError(error.message);
		} finally {
			setTimeout(() => {
				setIsLoggingOut(false);
				setShowLogoutModal(false);
			}, 1500);
		}
	};

	return (
		<userContext.Provider
			value={{
				token,
				setToken,
				user,
				setUser,
				firstName: user ? user.firstname : "",
				lastName: user ? user.lastname : "",
				emailAddress: user ? user.email : "",
				tutorDashboardData,
				studentDashboardData,
				dashboardData,
				setDashboardData,
				loading,
				setLoading,
				success,
				setSuccess,
				error,
				setError,
				logout,
				showLogoutModal,
				setShowLogoutModal,
				isLoggingOut,
				allCourses,
				courses,
				setCourses,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export default UserContextProvider;
