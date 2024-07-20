import React, { createContext, useState, useEffect } from "react";
import useApi from "../utils/customHooks";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("authToken"));
	const [user, setUser] = useState(null);
	const [dashboardData, setDashboardData] = useState(null);
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
		data: tutorDashboardData,
		loading: tutorLoading,
		error: tutorError,
	} = useApi("https://edture.onrender.com/users/tutor/dashboard", token);

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
		if (token) {
			fetchUserData(token);
		}
	}, [token]);

	const logout = () => {
		setIsLoggingOut(true);

		setTimeout(() => {
			localStorage.removeItem("authToken");
			setUser(null);
			setDashboardData(null);
			setToken(null);
			setIsLoggingOut(false);
			setShowLogoutModal(false);
		}, 2000);
	};

	const fetchUserData = async (token) => {
		try {
			const profileResponse = await fetch(
				"https://edture.onrender.com/users/profiles/my-profile",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			const dashboardResponse = await fetch(
				"https://edture.onrender.com/users/tutor/dashboard",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!profileResponse.ok || !dashboardResponse.ok) {
				throw new Error("Failed to fetch user data");
			}

			const profileData = await profileResponse.json();
			const dashboardData = await dashboardResponse.json();

			setUser(profileData.data);
			setDashboardData(dashboardData.data);
		} catch (error) {
			console.error("Error fetching user data:", error.message);
		}
	};

	return (
		<userContext.Provider
			value={{
				fetchUserData,
				token,
				setToken,
				user,
				firstName: user ? user.firstname : "",
				lastName: user ? user.lastname : "",
				emailAddress: user ? user.email : "",
				tutorDashboardData,
				tutorLoading,
				tutorError,
				userLoading,
				userError,
				setUser,
				loading,
				setLoading,
				error,
				setError,
				success,
				setSuccess,
				logout,
				showLogoutModal,
				setShowLogoutModal,
				isLoggingOut,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export default UserContextProvider;
