import React, { createContext, useState } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [fisrtName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const fetchUserData = async () => {
		try {
			const token = localStorage.getItem("authToken");

			if (!token) {
				throw new Error("No token found");
			}

			const response = await fetch(
				"https://edture.onrender.com/users/profiles/my-profile",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch user data");
			}

			const userData = await response.json();
			console.log(userData)
			return userData;
		} catch (error) {
			console.error("Error fetching user data:", error.message);
			return null;
		}
	};


	return (
		<userContext.Provider
			value={{
				user,
				setUser,
				fisrtName,
				setFirstName,
				lastName,
				setLastName,
				emailAddress,
				setEmailAddress,
				loading,
				setLoading,
				error,
				setError,
				success,
				setSuccess,
				fetchUserData,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export default UserContextProvider;
