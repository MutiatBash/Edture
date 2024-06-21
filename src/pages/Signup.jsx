import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import AuthCarousel from "../components/AuthCarousel";
import InputField from "../components/Input";

const Signup = () => {
	const studentImages = [
		"/signup-carousel/student1.png",
		"/signup-carousel/student1.png",
		"/signup-carousel/student1.png",
		"/signup-carousel/student1.png",
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

			// Optionally handle successful submission here
			console.log("Data submitted successfully:", values);
		} catch (error) {
			console.error("Error submitting data:", error.message);
		}
	};

	return (
		<section className="flex flex-col justify-between p-5 lg:pr-[120px] lg:pl-8 lg:py-6 relative">
			<div className="flex flex-row justify-between pt-4">
				<div className="hidden md:block w-[48%] inset-0 left-0 bg-white">
					<AuthCarousel images={studentImages} />
				</div>
				<div className="flex flex-row justify-center items-center w-[45%]">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ values, handleChange }) => (
							<Form className="w-full py-8 lg:py-14 flex flex-col gap-4 lg:gap-10 justify-between">
								<div>
									<div className="flex flex-row gap-2 justify-between">
										<h3 className="text-xl lg:text-3xl font-semibold">
											Create an Account
										</h3>
										{step !== 2 && (
											<SecondaryButton text={"Tutor Sign in"} />
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
										<p>
											Keep in sync with Edture’s community newsletter
											to receive mails on promotions, course updates,
											exclusive offers and personalized updates
										</p>
										<div>
											<label>
												<Field
													type="checkbox"
													name="receiveNewsletterUpdate"
													checked={values.receiveNewsletterUpdate}
													onChange={handleChange}
												/>
												<span className="ml-2"> Please contact me via email</span>
											</label>
										</div>
									</>
								)}
								<div className="flex flex-col gap-3 text-center">
									{step === 1 && (
										<PrimaryButton
											className={`w-full`}
											onClick={nextStep}
											text={"Continue"}
										/>
									)}
									{step === 2 && (
										<PrimaryButton
											className={`w-full`}
											type="submit"
											text={"Create Account"}
										/>
									)}
									<p>
										Already have an account?{" "}
										<a href="/login" className="text-primaryBlue">
											Sign in
										</a>
									</p>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</section>
	);
};

export default Signup;
