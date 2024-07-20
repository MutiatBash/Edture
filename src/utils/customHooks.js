import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url, token) => {
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
			} catch (error) {
				console.error("Error fetching data:", error.message);
				setError(error.message);
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

export default useApi;
