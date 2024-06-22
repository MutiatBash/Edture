import React, { createContext, useState } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
	const [fisrtName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	return (
		<userContext.Provider
			value={{
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
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export default UserContextProvider;
