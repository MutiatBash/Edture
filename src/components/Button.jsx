export const PrimaryButton = ({ text, className, onClick, type, disabled }) => {
	return (
		<div>
			<button
				disabled={disabled}
				type={type}
				onClick={onClick}
				className={`rounded-lg text-base text-white bg-primaryBlue md:py-3 md:px-5 hover:bg-hoverBlue transition-all ease-in cursor-pointer ${className} ${
					disabled ? "bg-gray text-lightGray" : ""
				}`}
			>
				{text}
			</button>
		</div>
	);
};

export const SecondaryButton = ({ text, className, onClick, disabled }) => {
	return (
		<div>
			<button
				onClick={onClick}
				className={`rounded-lg text-base bg-transparent border border-bg-primaryBlue text-primaryBlue md:py-3 md:px-5 hover:bg-secondaryHoverBlue cursor-pointer transition-all ease-in ${className}`}
			>
				{text}
			</button>
		</div>
	);
};

export const IconButton = ({ text, className, onClick, icon }) => {
	return (
		<div>
			<button
				onClick={onClick}
				className={`gap-2 flex justify-center rounded-lg py-[0.8rem] px-2 text-base bg-transparent hover:border-primaryBlue border border-lightGray text-darkGray md:py-[0.6875rem] md:px-5 cursor-pointer transition-all ease-in ${className}`}
			>
				<img src={icon} />
				<span>{text}</span>
			</button>
		</div>
	);
};
