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
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export default UserContextProvider;
