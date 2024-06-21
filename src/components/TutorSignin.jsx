import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IconButton, PrimaryButton, SecondaryButton } from "./Button";
import AuthCarousel from "./AuthCarousel";
import InputField from "./Input";
import google from "/google.png";
import { DividerWithText, Divider } from "./Dividers";

const TutorSignin = ({ setRole }) => {
	const studentImages = [
		"/signup-carousel/tutor1.png",
		"/signup-carousel/tutor2.png",
		"/signup-carousel/tutor3.png",
		"/signup-carousel/tutor4.png",
	];

	const [step, setStep] = useState(1);

	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);
	const goToStep = (stepNumber) => setStep(stepNumber);

	const initialValues = {
		email: "",
		password: "",
		firstname: "",
		lastname: "",
		username: "",
		receiveNewsletterUpdate: false,
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.required("Password is required")
			.matches(
				/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
				"Password must have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
			),
		firstname: Yup.string().required("First name is required"),
		lastname: Yup.string().required("Last name is required"),
		username: Yup.string().required("Username is required"),
	});

	const onSubmit = async (values) => {
		try {
			const role = "TUTOR";
			const data = {
				...values,
				role: role,
			};

			const response = await fetch("https://edture.onrender.com/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to submit data");
			}

			// Optionally handle successful submission here
			console.log("Data submitted successfully:", values);
		} catch (error) {
			console.error("Error submitting data:", error.message);
		}
	};

	return (
		<section className="flex flex-col lg:flex-row items-center p-5 lg:pr-24 lg:pl-8 lg:py-6">
			<div className="hidden md:block fixed left-0 top-0 bottom-0 w-[45%] bg-white z-0">
				<AuthCarousel images={studentImages} className="" />
			</div>
			<div className="flex flex-row justify-center items-center lg:w-1/2 w-full lg:ml-auto">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ values, handleChange }) => (
						<Form className="w-full py-8 lg:py-14 flex flex-col gap-4 lg:gap-8 justify-between">
							<div>
								<div className="flex flex-row gap-2 justify-between">
									<h3 className="text-xl lg:text-3xl font-semibold">
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
								<div>
									<label>
										<Field
											type="checkbox"
											name="rememberme"
											checked={values.receiveNewsletterUpdate}
											onChange={handleChange}
										/>
										<span className="ml-2">Remember me</span>
									</label>
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<PrimaryButton
									className={`w-full`}
									type="submit"
									text={"Sign in"}
								/>
								<Divider />
								<p className="text-sm">
									New to Edture?{" "}
									<a href="/signup" className="text-primaryBlue">
										Create an account
									</a>{" "}
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
