import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PrimaryButton, SecondaryButton, IconButton } from "./Button";
import AuthCarousel from "./AuthCarousel";
import InputField from "./Input";
import ValidationIndicator from "./ValidationIndicator";
import { Link, useNavigate } from "react-router-dom";
import google from "/google.png";
import logo from "/logo.png";
import { DividerWithText, Divider } from "./Dividers";

const StudentSignup = ({ setRole }) => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [passwordTouched, setPasswordTouched] = useState(false);
	const [passwordValidations, setPasswordValidations] = useState({
		length: false,
		upperLower: false,
		numberSpecialChar: false,
	});

	const validatePassword = (password) => {
		setPasswordValidations({
			length: password.length >= 8 && password.length <= 72,
			upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
			numberSpecialChar: /[0-9\W_]/.test(password),
		});
	};

	const initialValues = {
		email: "",
		password: "",
		firstname: "",
		lastname: "",
		username: "",
		receiveNewsletterUpdate: false,
	};

	const validationSchemaStep1 = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const validationSchemaStep2 = Yup.object({
		firstname: Yup.string().required("First name is required"),
		lastname: Yup.string().required("Last name is required"),
		username: Yup.string().required("Username is required"),
	});

	const nextStep = (formikProps) => {
		if (step === 1) {
			formikProps.validateForm().then((errors) => {
				if (!errors.email && !errors.password) {
					setStep(step + 1);
				}
			});
		} else {
			setStep(step + 1);
		}
	};

	const onSubmit = async (values) => {
		try {
			const role = "STUDENT";
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
			navigate("/login");
		} catch (error) {
			console.error("Error submitting data:", error.message);
		}
	};

	const studentImages = [
		"/signup-carousel/student1.png",
		"/signup-carousel/student2.png",
		"/signup-carousel/student3.png",
		"/signup-carousel/student4.png",
	];

	return (
		<section className="flex flex-col lg:flex-row items-center p-5 lg:pr-[120px] lg:pl-8 lg:py-6">
			<div className="hidden md:block fixed left-0 top-0 bottom-0 w-[45%] bg-white z-0">
				<AuthCarousel images={studentImages} className="" />
			</div>
			<div className="flex flex-row justify-center items-center lg:w-1/2 w-full lg:ml-auto">
				<Formik
					initialValues={initialValues}
					validationSchema={
						step === 1 ? validationSchemaStep1 : validationSchemaStep2
					}
					onSubmit={onSubmit}
					validateOnChange={true}
					validateOnBlur={true}
				>
					{(formikProps) => (
						<Form className="w-full py-8 lg:py-5 flex flex-col gap-4 lg:gap-8 justify-between">
							<div className="w-[15%] self-end">
								<img src={logo} className="" alt="Logo" />
							</div>
							<div>
								<div className="flex flex-row gap-2 justify-between">
									<h3 className="text-xl lg:text-3xl font-semibold">
										Create an Account
									</h3>
									{step !== 2 && (
										<SecondaryButton
											text={"Tutor Sign up"}
											onClick={() => setRole("TUTOR")}
										/>
									)}
								</div>
								<div className="flex mt-3">
									<div className="flex w-[20%] justify-between gap-1">
										<div
											onClick={() => setStep(1)}
											className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
												step === 1
													? "bg-darkGray w-[70%]"
													: "bg-lightGray w-[30%]"
											}`}
										></div>
										<div
											onClick={() => setStep(2)}
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
										type="email"
										placeholder="Enter your email address"
									/>
									<InputField
										label="Password"
										name="password"
										type="password"
										placeholder="Enter your password"
										onBlur={(e) => {
											formikProps.handleBlur(e);
											setPasswordTouched(true);
											validatePassword(e.target.value);
										}}
									/>
									{passwordTouched && (
										<div>
											<ValidationIndicator
												message="Between 8 and 72 characters"
												isValid={passwordValidations.length}
											/>
											<ValidationIndicator
												message="Contains uppercase (AZ) and lowercase letters (az)"
												isValid={passwordValidations.upperLower}
											/>
											<ValidationIndicator
												message="Contains at least one number (0-9) or one symbol"
												isValid={
													passwordValidations.numberSpecialChar
												}
											/>
										</div>
									)}
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
												checked={
													formikProps.values
														.receiveNewsletterUpdate
												}
												onChange={formikProps.handleChange}
											/>
											<span className="ml-2">
												{" "}
												Please contact me via email
											</span>
										</label>
									</div>
								</>
							)}
							<div className="flex flex-col gap-3 text-center">
								{step === 1 && (
									<>
										<PrimaryButton
											className={`w-full`}
											onClick={() => nextStep(formikProps)}
											text={"Continue"}
											type="button"
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
										<Link to="/signin" className="text-primaryBlue">
											Sign in
										</Link>
									</p>
								)}
								{step === 2 && (
									<p className="self-start text-left text-sm">
										By clicking on create account you agree to
										Edture’s{" "}
										<Link to="/" className="text-primaryBlue">
											Terms and conditions
										</Link>{" "}
										and{" "}
										<Link to="/" className="text-primaryBlue">
											Privacy Policy
										</Link>
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

export default StudentSignup;
