import React, { useContext, useState } from "react";
import CourseDetailsLayout from "../layouts/CourseDetailsLayout";
import RecommendedCourses from "../components/courses/RecommendedCourses";
import { userContext } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import CartCard from "../components/cards/CartCard";
import { ConfirmationModal } from "../components/popups/Modal";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import { Divider } from "../components/Dividers";
// import { InputField } from "../components/inputs/CourseCreationInputs";
import InputField from "../components/inputs/AuthInputs";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Checkout = () => {
	const { user } = useContext(userContext);
	const { cartItems } = useCart();
	const initialValues = {
		email: user?.email,
		firstname: "",
		lastname: "",
		country: "",
		state: "",
		address: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		firstname: Yup.string().required("First name is required"),
		lastname: Yup.string().required("Last name is required"),
		country: Yup.string().required("Country is required"),
		state: Yup.string().required("State is required"),
		address: Yup.string().required("Address is required"),
	});

	return (
		<div>
			<CourseDetailsLayout>
				<div className="flex flex-col">
					<div className="px-12 py-10 flex flex-col gap-6">
						<div>
							<h3 className="text-2xl font-semibold py-2">Checkout</h3>
							<p className="font-trap-grotesk text-lg font-medium">
								Billing Details
							</p>
						</div>

						<div className="w-[60%]">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								// onSubmit={onSubmit}
							>
								<Form className="flex flex-col gap-5">
									<InputField
										type="email"
										name="email"
										label="Email address"
										disabled
									/>
									<div className="flex justify-between items-start gap-3">
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
									</div>
									<div className="flex justify-between items-start gap-3">
										<InputField
											label="Country/Region"
											name="country"
											placeholder="Country"
										/>
										<InputField
											label="State/County"
											name="state"
											placeholder="State"
										/>
									</div>
									<InputField
										label="Street address"
										name="address"
										placeholder="Address"
									/>
								</Form>
							</Formik>
						</div>

						<div>
							<h3 className="text-2xl font-semibold py-2">
								Order details
							</h3>
							<div className="flex flex-col gap-2 w-[60%]">
								{cartItems?.map((item, index) => (
									<div
										className="flex justify-between items-center"
										key={index}
									>
										<div>
											<h6 className="font-trap-grotesk font-medium text-lg">
												{item.title}
											</h6>
										</div>
										<p className="font-trap-grotesk font-semibold text-lg">
											NGN {item.price}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
					<CheckoutModal />
				</div>
			</CourseDetailsLayout>
		</div>
	);
};

export default Checkout;

const CheckoutModal = () => {
	const { cartItems } = useCart();
	const navigate = useNavigate();

	const calculateTotalPrice = (items) => {
		if (items.length === 0) return { total: 0, currency: "" };

		const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
		const currency = items[0].currency;
		return { totalPrice, currency };
	};

	const { totalPrice, currency } = calculateTotalPrice(cartItems);
	// Proceed to checkout
	const handleProceed = () => {
		navigate("/checkout");
	};

	return (
		<div className="fixed top-32 right-14 p-4 w-full max-w-[400px] bg-white shadow-lg z-20 rounded-lg font-trap-grotesk">
			<div>
				<h3 className="text-2xl font-semibold">Order Summary</h3>
				<div className="flex justify-between items-center mb-4">
					<p className="text-lg text-lightGray font-trap-grotesk font-medium">
						Subtotal:
					</p>
					<p className="text-lg font-semibold font-trap-grotesk text-lightGray">
						{currency} {totalPrice?.toFixed(2)}
					</p>
				</div>
			</div>
			<Divider />
			<div className="flex justify-between items-center my-4">
				<p className="text-lg text-lightGray font-trap-grotesk font-medium">
					Total:
				</p>
				<p className="text-2xl font-semibold font-trap-grotesk">
					{currency} {totalPrice?.toFixed(2)}
				</p>
			</div>
			<div className="flex flex-col gap-2 pb-5">
				<p className="text-sm text-lightGray">
					We collect and use your personal information to fulfill orders,
					personalize your experience on our website, and as otherwise
					described in our privacy policy
				</p>
				<div className="flex gap-2 items-center">
					<input type="checkbox" />
					<p className="text-xs text-darkGray opacity-70">
						By completing your purchase you agree to these{" "}
						<span className="text-primaryBlue underline text-xs">
							Terms of Service.
						</span>
					</p>
				</div>
			</div>

			<PrimaryButton
				text={"Complete checkout"}
				className="w-full"
				onClick={handleProceed}
			/>
		</div>
	);
};
