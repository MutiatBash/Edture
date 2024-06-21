import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IconButton, PrimaryButton, SecondaryButton } from "./Button";
import AuthCarousel from "./AuthCarousel";
import InputField from "./Input";
import google from "/google.png";
import logo from "/logo.png";
import { DividerWithText, Divider } from "./Dividers";

const TutorSignup = ({ setRole }) => {
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
						<Form className="w-full py-8 lg:py-5 flex flex-col gap-4 lg:gap-8 justify-between">
							<div className="w-[15%] self-end">
								<img src={logo} className="" />
							</div>
							<div>
								<div className="flex flex-row gap-2 justify-between">
									<h3 className="text-xl lg:text-3xl font-semibold">
										Create an Account
									</h3>
									{step !== 2 && (
										<SecondaryButton
											text={"Student Sign up"}
											onClick={() => setRole("STUDENT")}
										/>
									)}
								</div>
								<div className="flex mt-3">
									<div className="flex w-[20%] justify-between gap-1">
										<div
											onClick={() => goToStep(1)}
											className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
												step === 1
													? "bg-darkGray w-[70%]"
													: "bg-lightGray w-[30%]"
											}`}
										></div>
										<div
											onClick={() => goToStep(2)}
											className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
												step === 2
													? "bg-darkGray w-[70%]"
													: "bg-lightGray w-[30%]"
											}`}
										></div>
									</div>
								</div>
							</div>
							{step === 1 && (
								<div className="flex flex-col gap-6">
									<IconButton
										icon={google}
										text={"Sign up with Google"}
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
								</div>
							)}
							{step === 2 && (
								<>
									<div className="flex flex-col gap-6">
										<InputField
											label="First Name"
											name="firstname"
											placeholder="Enter your first name"
										/>
										<InputField
											label="Last Name"
											name="lastname"
											placeholder="Enter your last name"
										/>
										<InputField
											label="Username"
											name="username"
											placeholder="Enter your username"
										/>
									</div>
									<div className="flex flex-col gap-2 text-sm">
										<p>
											Keep in sync with Edture’s community newsletter
											to receive mails on promotions, course updates,
											exclusive offers and personalized updates
										</p>
										<label>
											<Field
												type="checkbox"
												name="receiveNewsletterUpdate"
												checked={values.receiveNewsletterUpdate}
												onChange={handleChange}
											/>
											<span className="ml-2">
												{" "}
												Please contact me via email
											</span>
										</label>
									</div>
								</>
							)}
							<div className="flex flex-col gap-3">
								{step === 1 && (
									<>
										<PrimaryButton
											className={`w-full`}
											onClick={nextStep}
											text={"Continue"}
										/>
										<Divider />
									</>
								)}
								{step === 2 && (
									<>
										<PrimaryButton
											className={`w-full`}
											type="submit"
											text={"Create Account"}
										/>
										<Divider />
									</>
								)}
								{step === 1 && (
									<p className="self-start text-left text-sm">
										Already have an account?{" "}
										<a href="/signin" className="text-primaryBlue">
											Sign in
										</a>
									</p>
								)}
								{step === 2 && (
									<p className="self-start text-left text-sm">
										By clicking on create account you agree to
										Edture’s{" "}
										<a className="text-primaryBlue">
											Terms and conditions
										</a>{" "}
										and{" "}
										<a className="text-primaryBlue">Privacy Policy</a>
									</p>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export default TutorSignup;
