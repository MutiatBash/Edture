import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "./Input";
import { PrimaryButton } from "./Button";
import { Link } from "react-router-dom";
import { Divider } from "./Dividers";
import logo from "/edture-logo.svg";
import resetpassword from "/reset-password-icon.svg";
import { userContext } from "../context/UserContext";

export const ForgotPasswordModal = () => {
	const { success, setSuccess, loading, setLoading, error, setError } =
		useContext(userContext);

	const initialValues = {
		email: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Enter your email address"),
	});

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const response = await fetch(
				"https://edture.onrender.com/auth/request-password-reset",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to submit data");
			}

			const data = await response.json();
			setLoading(false);
			setSuccess(true);
			setError(null);
			console.log("Data submitted successfully:", data);
		} catch (error) {
			setLoading(false);
			setError(error.message);
			console.error("Error submitting data:", error.message);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-white w-full">
			<div className="flex flex-col mx-auto gap-3 bg-white shadow-md md:min-w-[600px] px-8 py-10 rounded-lg">
				{success ? (
					<div className="flex flex-col gap-2 text-center">
						<div>
							<img src={resetpassword} />
						</div>
						<h2 className="font-semibold text-3xl">Check your inbox</h2>
						<p>We’ve sent an email to reset your password.</p>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-2 items-center text-center py-5">
							<div>
								<img src={resetpassword} />
							</div>
							<h2 className="font-semibold text-3xl">Reset Password</h2>
							<p>We will send you the reset instructions/link.</p>
						</div>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<div className="flex flex-col gap-6">
										<InputField
											label="Email Address"
											name="email"
											placeholder="Enter your email address"
										/>
										<PrimaryButton
											className="w-full"
											type="submit"
											text={
												isSubmitting
													? "Submitting..."
													: "Request reset instructions"
											}
											disabled={isSubmitting || loading}
										/>
									</div>
								</Form>
							)}
						</Formik>
					</>
				)}
				{error && (
					<div className="text-red text-sm text-center">{error}</div>
				)}
				<Link
					to="/signin"
					className="text-primaryBlue underline text-center"
				>
					Return to sign in
				</Link>
				<Divider />
				<p className="text-center">
					<Link className="text-primaryBlue underline">
						Terms and Conditions
					</Link>{" "}
					and{" "}
					<Link className="text-primaryBlue underline">
						Privacy Policy
					</Link>
				</p>
				<div className="w-[12%] self-center pt-4">
					<img src={logo} className="w-full" />
				</div>
			</div>
		</div>
	);
};

export const ResetPasswordModal = () => {
	const initialValues = {
		password: "",
	};

	const validationSchema = Yup.object({
		password: Yup.string().required("Enter your new password"),
	});

	const onSubmit = (values, { setSubmitting }) => {
		console.log(values);
		setSubmitting(false);
	};

	return (
		<div className="flex flex-col mx-auto gap-3 bg-white shadow-md md:max-w-[500px] px-8 py-10 rounded-lg">
			<div className="flex flex-col gap-2 items-center text-center py-5">
				<div>
					<img src={resetpassword} />
				</div>
				<h2 className="font-semibold text-3xl">Create new password</h2>
				<p>Create a new password for your account.</p>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="flex flex-col gap-6">
							<InputField
								label="New Password"
								name="password"
								placeholder="Create a new password"
							/>
							<PrimaryButton
								className="w-full"
								type="submit"
								text={isSubmitting ? "Submitting..." : "Reset password"}
								disabled={isSubmitting}
							/>
						</div>
					</Form>
				)}
			</Formik>
			<Link to="/signin" className="text-primaryBlue underline text-center">
				Return to sign in
			</Link>
			<Divider />
			<p className="text-center">
				<Link className="text-primaryBlue underline">
					Terms and Conditions
				</Link>{" "}
				and{" "}
				<Link className="text-primaryBlue underline">Privacy Policy</Link>
			</p>
			<div className="w-[12%] self-center pt-4">
				<img src={logo} className="w-full" />
			</div>
		</div>
	);
};
