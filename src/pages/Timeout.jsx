import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";

const InactivityTimeout = ({ timeout = 15 * 60 * 1000 }) => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(userContext);
	const timerRef = useRef(null);

	const resetTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			handleTimeout();
		}, timeout);
	};

	const handleTimeout = () => {
		// Clear user session or token
		localStorage.removeItem("authToken");
		setUser(null); // Clear user context

		// Redirect to appropriate sign-in page
		if (user?.role === "TUTOR") {
			navigate("/tutor-signin");
		} else {
			navigate("/student-signin");
		}
		console.log("Session timeout");
	};

	useEffect(() => {
		const events = ["mousemove", "keydown", "scroll", "click"];

		const reset = () => resetTimer();

		events.forEach((event) =>
			window.addEventListener(event, reset, { passive: true })
		);

		resetTimer();

		return () => {
			events.forEach((event) => window.removeEventListener(event, reset));
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [user, navigate]);

	return null;
};

export default InactivityTimeout;
