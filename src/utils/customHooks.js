import { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";
import axios from "axios";

export const useApi = (url, token) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!token) return;

		const fetchData = async () => {
			setLoading(true);

			try {
				const response = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				console.log("Fetched data:", response.data);
				setData(response.data.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error.message);
				setError(error.message);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url, token]);

	return {
		data,
		loading,
		error,
	};
};

export const useInactivityTimeout = (timeout = 60000) => {
	const navigate = useNavigate();
	const { user, setUser, setToken } = useContext(userContext);
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
		localStorage.removeItem("authToken");
		setUser(null);
		setToken(null);

		if (user?.role === "TUTOR") {
			navigate("/tutor-signin");
		} else {
			navigate("/student-signin");
		}
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
