import { useState, useEffect } from "react";

const useApi = (url, token) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const result = await response.json();
				console.log("Fetched data:", result);
				setData(result.data);
			} catch (error) {
				console.error("Error fetching data:", error.message);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url, token]);

	return { data, loading, error };
};

export default useApi;
