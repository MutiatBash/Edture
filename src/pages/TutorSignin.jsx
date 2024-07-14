import React, { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IconButton, PrimaryButton, SecondaryButton } from "../components/Button";
import AuthCarousel from "../components/carousel/AuthCarousel";
import InputField from "../components/inputs/Input";
import google from "/google.png";
import logo from "/edture-logo.svg";
import { DividerWithText, Divider } from "../components/Dividers";
import { userContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const TutorSignin = ({ setRole }) => {
	const navigate = useNavigate();
	const {
		firstName,
		setFirstName,
		lastName,
		setLastName,
		emailAddress,
		setEmailAddress,
		loading,
		setLoading,
		error,
		setError,
	} = useContext(userContext);

	const tutorImages = [
		"/signup-carousel/tutor1.png",
		"/signup-carousel/tutor2.png",
		"/signup-carousel/tutor3.png",
		"/signup-carousel/tutor4.png",
	];

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Enter your email address"),
		password: Yup.string().required("Enter your password"),
	});

	const onSubmit = async (values) => {
		try {
			setLoading(true);

			const response = await fetch(
				"https://edture.onrender.com/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (response.status === 401) {
				setError("Email or password is incorrect");
				setLoading(false);
				return;
			}

			if (!response.ok) {
				throw new Error("Failed to submit data");
			}
			const dataFetched = await response.json();
			setError(null);
			setLoading(false);
			console.log("Data submitted successfully:", dataFetched);
			navigate("/dashboard");
		} catch (error) {
			setLoading(false);
			console.error("Error submitting data:", error.message);
		}
	};

	return (
		<section className="flex flex-col lg:flex-row items-center p-5 lg:pr-[120px] lg:pl-8 lg:py-6">
			<div className="hidden md:block fixed left-0 top-0 bottom-0 w-[45%] bg-white z-0">
				<AuthCarousel images={tutorImages} className="" />
			</div>
			<div className="flex flex-row justify-center items-center lg:w-1/2 w-full lg:ml-auto">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ values, handleChange }) => (
						<Form className="w-full py-8 lg:py-5 flex flex-col gap-4 lg:gap-8 justify-between">
							<div className="w-[20%] md:w-[15%] self-end pb-8">
								<img src={logo} className="w-full" />
							</div>
							<div>
								<div className="flex flex-row gap-2 justify-between items-center">
									<h3 className="text-3xl font-semibold w-1/2">
										Welcome Back
									</h3>
									<SecondaryButton
										text={"Student Sign in"}
										onClick={() => setRole("STUDENT")}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-6">
								<IconButton
									icon={google}
									text={"Sign in with Google"}
									className="w-full"
								/>
								<DividerWithText />
								<InputField
									label="Email Address"
									name="email"
									placeholder="Enter your email address"
								/>
								<InputField
									label="Password"
									name="password"
									type="password"
									placeholder="********"
								/>
								<div className="flex items-center justify-between">
									<label className="flex items-center">
										<Field
											type="checkbox"
											name="rememberme"
											onChange={handleChange}
										/>
										<span className="ml-2">Remember me</span>
									</label>
									<Link
										to="/forgot-password"
										className="text-primaryBlue underline"
									>
										Forgot Password?
									</Link>
								</div>
							</div>
							<div className="flex flex-col gap-3">
								{error && (
									<div className="text-red text-sm text-left">
										{error}
									</div>
								)}
								<PrimaryButton
									className={`w-full`}
									type="submit"
									text={loading ? "Signing in" : "Sign in"}
								/>
								<Divider />
								<p className="text-sm">
									New to Edture?{" "}
									<Link
										to="/tutor-signup"
										className="text-primaryBlue underline"
									>
										Create an account
									</Link>{" "}
									for free
								</p>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export default TutorSignin;
