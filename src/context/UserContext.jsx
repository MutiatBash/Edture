import React, { createContext, useState, useEffect } from "react";
import { useApi } from "../utils/customHooks";
import axios from "axios";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("authToken"));
	const [user, setUser] = useState(null);
	const [dashboardData, setDashboardData] = useState(null);
	const [courses, setCourses] = useState(null);
	const [enrolledCourses, setEnrolledCourses] = useState(null);
	const [studentCourses, setStudentCourses] = useState([]);
	const [courseById, setCourseById] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [authLoading, setAuthLoading] = useState(false);
	const [authError, setAuthError] = useState("");
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [role, setRole] = useState(() => localStorage.getItem("userRole"));

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

	// const {
	// 	data: enrolledCoursesData,
	// 	loading: enrolledCoursesLoading,
	// 	error: enrolledCoursesError,
	// } = useApi(
	// 	`https://edture.onrender.com/users/student/courses/${courses?.id}`,
	// 	token
	// );

	// const {
	// 	data: studentCoursesData,
	// 	loading: studentCoursesLoading,
	// 	error: studentCoursesError,
	// } = useApi("https://edture.onrender.com/users/student/courses", token);

	useEffect(() => {
		if (userData) {
			setUser(userData);
			if (userData?.role) {
				setRole(userData?.role);
				localStorage.setItem("userRole", userData?.role);
			}
		}
	}, [userData]);

	useEffect(() => {
		if (user?.email) {
			localStorage.setItem("userEmail", user.email);
		}
	}, [user]);

	useEffect(() => {
		if (tutorDashboardData || studentDashboardData) {
			setDashboardData(tutorDashboardData || studentDashboardData);
		}
	}, [tutorDashboardData, studentDashboardData]);

	useEffect(() => {
		if (allCourses) {
			setCourses(allCourses);
		}
	}, [allCourses]);

	// useEffect(() => {
	// 	if (enrolledCoursesData) {
	// 		setEnrolledCourses(enrolledCoursesData);
	// 	}
	// }, [enrolledCoursesData]);

	// useEffect(() => {
	// 	if (studentCoursesData) {
	// 		setStudentCourses(studentCoursesData);
	// 		console.log("student courses",studentCourses)
	// 	}
	// }, [studentCoursesData]);

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

	const fetchCourseById = async (courseId) => {
		try {
			const response = await axios.get(
				`https://edture.onrender.com/courses/${courseId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setCourseById(response.data);
		} catch (error) {
			console.error("Error fetching course by ID:", error);
			setError(error.message);
		}
	};

	const fetchEnrolledStudentCourses = async () => {
		try {
			const response = await axios.get(
				"https://edture.onrender.com/users/student/courses",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			const fetchedCourses = response?.data;
			setStudentCourses(fetchedCourses);
			console.log("Student courses showing", studentCourses);
			console.log("Student courses here", response.data);
		} catch (error) {
			console.error("Error fetching courses:", error);
			setError(error.message);
		}
	};

	useEffect(() => {
		if (studentCourses.length > 0) {
			console.log("Student courses should show", studentCourses); // This will log the updated courses
		}
	}, [studentCourses]);

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
				role,
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
				authError,
				setAuthError,
				authLoading,
				setAuthLoading,
				fetchCourseById,
				fetchEnrolledStudentCourses,
				courseById,
				enrolledCourses,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export default UserContextProvider;
