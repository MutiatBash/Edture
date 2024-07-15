import { useEffect, useState } from "react";

export const GoogleSignIn = () => {
	const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
	const [user, setUser] = useState(undefined);
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	useEffect(() => {
		console.log("Client ID from .env:", clientId);
	}, [clientId]);

	const handleGoogleSignIn = async (res) => {
		if (!res.clientId || !res.credential) {
			console.error(
				"Google Sign-in response is missing clientId or credential"
			);
			return;
		}

		console.log("Google Sign-in successful:", res);
		const { credential } = res;
		const data = {
			token: credential,
			role: "STUDENT",
		};

		try {
			const response = await fetch(
				"https://edture.onrender.com/auth/google-token-verify",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error(
					`Network response was not ok: ${response.statusText}`
				);
			}

			const result = await response.json();
			setUser(result.user); // Adjust according to your backend response
			console.log("User set successfully:", result.user);
		} catch (error) {
			console.error("Error verifying Google token:", error);
		}
	};

	const initializeGsi = () => {
		if (!window.google || gsiScriptLoaded) return;

		setGsiScriptLoaded(true);
		window.google.accounts.id.initialize({
			client_id: clientId,
			callback: handleGoogleSignIn,
		});
		window.google.accounts.id.renderButton(
			document.getElementById("googleSignInButton"),
			{ theme: "outline", size: "large" }
		);
	};

	useEffect(() => {
		if (user?._id || gsiScriptLoaded) return;

		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.onload = initializeGsi;
		script.async = true;
		script.id = "google-client-script";
		document.querySelector("body")?.appendChild(script);

		return () => {
			window.google?.accounts.id.cancel();
			document.getElementById("google-client-script")?.remove();
		};
	}, [gsiScriptLoaded, user?._id]);
	return <div id="googleSignInButton" className="g_id_signin"></div>;
};


export const GoogleSignUp = () => {
	const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
	const [user, setUser] = useState(undefined);
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	useEffect(() => {
		console.log("Client ID from .env:", clientId);
	}, [clientId]);

	const handleGoogleSignUp = async (res) => {
		if (!res.clientId || !res.credential) {
			console.error(
				"Google Sign-in response is missing clientId or credential"
			);
			return;
		}

		console.log("Google Sign-in successful:", res);
		const { credential } = res;
		const data = {
			token: credential,
			role: "STUDENT", 
		};

		try {
			const response = await fetch(
				`https://edture.onrender.com/auth/google-token-verify/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error(
					`Network response was not ok: ${response.statusText}`
				);
			}

			const result = await response.json();
			setUser(result.user); // Adjust according to your backend response
			console.log("User set successfully:", result.user);
		} catch (error) {
			console.error("Error verifying Google token:", error);
		}
	};

	const initializeGsi = () => {
		if (!window.google || gsiScriptLoaded) return;

		setGsiScriptLoaded(true);
		window.google.accounts.id.initialize({
			client_id: clientId,
			callback: handleGoogleSignUp,
		});
		window.google.accounts.id.renderButton(
			document.getElementById("googleSignUpButton"),
			{ theme: "outline", size: "large" }
		);
	};

	useEffect(() => {
		if (user?._id || gsiScriptLoaded) return;

		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.onload = initializeGsi;
		script.async = true;
		script.id = "google-client-script";
		document.querySelector("body")?.appendChild(script);

		return () => {
			window.google?.accounts.id.cancel();
			document.getElementById("google-client-script")?.remove();
		};
	}, [gsiScriptLoaded, user?._id]);

	return <div id="googleSignUpButton" className="g_id_signup"></div>;
};
