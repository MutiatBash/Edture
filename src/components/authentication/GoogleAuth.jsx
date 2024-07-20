import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { SpinnerLoader } from "../Loader";

const handleStudentGoogleAuth = async (res, setLoading, navigate) => {
	if (!res.clientId || !res.credential) return;

	const { credential } = res;
	const data = {
		token: credential,
		role: "STUDENT",
	};

	setLoading(true);

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

		const result = await response.json();
		localStorage.setItem("authToken", result.data.token);
		setLoading(false);
		navigate("/student-dashboard");
	} catch (error) {
		console.error("Error during Google authentication:", error);
	} finally {
		setLoading(false);
	}
};

const handleTutorGoogleAuth = async (res, setLoading, navigate) => {
	if (!res.clientId || !res.credential) return;

	const { credential } = res;
	const data = {
		token: credential,
		role: "TUTOR",
	};

	setLoading(true);

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

		const result = await response.json();
		console.log(result.data.token);
		localStorage.setItem("authToken", result.data.token);
		setLoading(false);
		navigate("/tutor-dashboard");
	} catch (error) {
		console.error("Error during Google authentication:", error);
	} finally {
		setLoading(false);
	}
};

// STUDENT GOOGLE AUTHENTICATION
export const StudentGoogleSignUp = () => {
	const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(undefined);
	const navigate = useNavigate();

	const handleGoogleSignUp = (res) =>
		handleStudentGoogleAuth(res, setLoading, navigate);

	const initializeGsi = () => {
		if (!window.google || gsiScriptLoaded) return;

		setGsiScriptLoaded(true);
		window.google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleGoogleSignUp,
			ux_mode: "popup",
			context: "signup",
		});
		window.google.accounts.id.renderButton(
			document.getElementById("googleSignUpButton"),
			{ theme: "outline", size: "large", text: "signup_with" }
		);
		console.log("clientid", import.meta.env.VITE_GOOGLE_CLIENT_ID);
	};

	useEffect(() => {
		if (gsiScriptLoaded) return;

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
	}, [gsiScriptLoaded]);

	return (
		<>
			{loading && <SpinnerLoader />}
			<div id="googleSignUpButton" className="g_id_signup"></div>
		</>
	);
};

export const StudentGoogleSignIn = () => {
	const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(undefined);

	const handleGoogleSignIn = (res) =>
		handleStudentGoogleAuth(res, setLoading, navigate);

	const initializeGsi = () => {
		if (!window.google || gsiScriptLoaded) return;

		setGsiScriptLoaded(true);
		window.google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleGoogleSignIn,
			ux_mode: "popup",
			context: "signin",
		});
		window.google.accounts.id.renderButton(
			document.getElementById("googleSignInButton"),
			{ theme: "outline", size: "large", text: "signin_with" }
		);
		console.log("clientid", import.meta.env.VITE_GOOGLE_CLIENT_ID);
	};

	useEffect(() => {
		if (gsiScriptLoaded) return;

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
	}, [gsiScriptLoaded]);

	return (
		<>
			{loading && <SpinnerLoader />}
			<div id="googleSignInButton" className="g_id_signin"></div>
		</>
	);
};

// TUTOR GOOGLE AUTHENTICATION
export const TutorGoogleSignUp = () => {
	const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(undefined);

	const handleGoogleSignUp = (res) =>
		handleTutorGoogleAuth(res, setLoading, navigate);

	const initializeGsi = () => {
		if (!window.google || gsiScriptLoaded) return;

		setGsiScriptLoaded(true);
		window.google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleGoogleSignUp,
			ux_mode: "popup",
			context: "signup",
		});
		window.google.accounts.id.renderButton(
			document.getElementById("googleSignUpButton"),
			{ theme: "outline", size: "large", text: "signup_with" }
		);
		console.log("clientid", import.meta.env.VITE_GOOGLE_CLIENT_ID);
	};

	useEffect(() => {
		if (gsiScriptLoaded) return;

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
	}, [gsiScriptLoaded]);

	return (
		<>
			{loading && <SpinnerLoader />}
			<div id="googleSignUpButton" className="g_id_signup"></div>
		</>
	);
};

export const TutorGoogleSignIn = () => {
	const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(undefined);

	const handleGoogleSignIn = (res) =>
		handleTutorGoogleAuth(res, setLoading, navigate);

	const initializeGsi = () => {
		if (!window.google || gsiScriptLoaded) return;

		setGsiScriptLoaded(true);
		window.google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleGoogleSignIn,
			ux_mode: "popup",
			context: "signin",
		});
		window.google.accounts.id.renderButton(
			document.getElementById("googleSignInButton"),
			{ theme: "outline", size: "large", text: "signin_with" }
		);
		console.log("clientid", import.meta.env.VITE_GOOGLE_CLIENT_ID);
	};

	useEffect(() => {
		if (gsiScriptLoaded) return;

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
	}, [gsiScriptLoaded]);

	return (
		<>
			{loading && <SpinnerLoader />}
			<div id="googleSignInButton" className="g_id_signin"></div>
		</>
	);
};
