export const PrimaryButton = ({ text, className, onClick, type, disabled }) => {
	return (
		<div>
			<button
				disabled={disabled}
				type={type}
				onClick={onClick}
				className={`rounded-lg text-base text-white bg-primaryBlue font-semibold md:py-3 md:px-5 hover:shadow-md transition-all ease-in cursor-pointer ${className} ${
					disabled ? "bg-gray text-lightGray" : ""
				}`}
			>
				{text}
			</button>
		</div>
	);
};

export const SecondaryButton = ({ text, className, onClick }) => {
	return (
		<div>
			<button
				onClick={onClick}
				className={`rounded-lg text-base bg-transparent border border-bg-primaryBlue text-primaryBlue font-semibold md:py-3 md:px-5 hover:shadow-md cursor-pointer transition-all ease-in ${className}`}
			>
				{text}
			</button>
		</div>
	);
};

export const IconButton = ({ text, className, onClick }) => {
	return (
		<div>
			<button
				onClick={onClick}
				className={`gap-2 w-[fit-content] py-[0.8rem] px-2 whitespace-nowrap text-base bg-transparent border border-white text-white font-semibold md:py-[0.6875rem] md:px-5 hover:shadow-md cursor-pointer transition-all ease-in ${className}`}
			>
				{text}
			</button>
		</div>
	);
};

