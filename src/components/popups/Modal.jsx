import React from "react";
import { PrimaryButton, SecondaryButton } from "../Button";

export const SuccessModal = ({
	img,
	heading,
	content,
	buttonText,
	onConfirm,
	onClose,
	imageStyling,
	allowClose = true,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-primaryBlack bg-opacity-50 z-50 backdrop-blur">
			<div className="bg-white flex flex-col gap-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full p-6 pb-8">
				{allowClose && (
					<button
						className="ml-auto bg-transparent border-0 float-right font-semibold outline-none focus:outline-none"
						onClick={onClose}
					>
						<span className="text-xl block outline-none focus:outline-none">
							&times;
						</span>
					</button>
				)}
				<div className="flex flex-col gap-3 items-center">
					<div className={` ${imageStyling}`}>
						<img src={img} className="w-full" />
					</div>
					<div className="text-center text-xl">
						<h3 className="text-3xl text-center font-semibold w-[80%] mx-auto">
							{heading}
						</h3>
						<p className="text-lg font-trap-grotesk font-medium">
							{content}
						</p>
					</div>
				</div>

				<PrimaryButton
					className="w-full"
					onClick={onConfirm}
					text={buttonText}
				/>
			</div>
		</div>
	);
};

export const ConfirmationModal = ({
	img,
	heading,
	content,
	confirmText,
	cancelText,
	onConfirm,
	onClose,
	imageStyling,
}) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-primaryBlack bg-opacity-50 z-50 backdrop-blur">
			<div className="bg-white flex flex-col gap-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full p-6 pb-8">
				<button
					className="ml-auto bg-transparent border-0 float-right font-semibold outline-none focus:outline-none"
					onClick={onClose}
				>
					<span className="text-xl block outline-none focus:outline-none">
						&times;
					</span>
				</button>
				<div className="flex flex-col gap-3 items-center">
					{img && (
						<div className={` ${imageStyling}`}>
							<img src={img} className="w-full" />
						</div>
					)}
					<div className="text-center text-xl">
						<h3 className="text-3xl text-center font-semibold w-[80%] mx-auto">
							{heading}
						</h3>
						<p className="text-lg font-trap-grotesk font-medium p-2">
							{content}
						</p>
					</div>
				</div>
				<div className="flex gap-3 justify-center items-center">
					<PrimaryButton
						className="w-full"
						onClick={onClose}
						text={cancelText}
					/>
					<SecondaryButton
						className="w-full"
						onClick={onConfirm}
						text={confirmText}
					/>
				</div>
			</div>
		</div>
	);
};

export const SessionTimeoutModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="bg-white p-6 rounded shadow-lg z-10">
				<h2 className="text-xl font-semibold mb-4">Session Expired</h2>
				<p>Your session has expired. You will be logged out.</p>
				<div className="mt-4 flex justify-end">
					<PrimaryButton text={"Ok"} onClick={onClose} />
				</div>
			</div>
		</div>
	);
};
