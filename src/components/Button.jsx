export const PrimaryButton = ({ text, className, onClick, type, disabled }) => {
	return (
		<div>
			<button
				disabled={disabled}
				type={type}
				onClick={onClick}
				className={`rounded-lg text-lg text-white bg-primaryBlue p-2 py-3 md:py-4 md:px-5 hover:bg-hoverBlue transition-all ease-in cursor-pointer font-trap-grotesk font-medium tracking-tight ${className} ${
					disabled ? "bg-lightGray text-darkGray cursor-not-allowed" : ""
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
				className={`rounded-lg text-base bg-transparent border border-bg-primaryBlue text-primaryBlue p-2 md:py-3 md:px-5 hover:bg-secondaryHoverBlue cursor-pointer transition-all ease-in font-trap-grotesk font-medium tracking-tight ${className}`}
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
				className={`gap-2 flex justify-center items-center rounded-lg p-2 py-3 md:py-4 md:px-5 text-base bg-transparent hover:border-primaryBlue border border-lightGray text-darkGray cursor-pointer transition-all ease-in ${className}`}
			>
				<img src={icon} className="w-5" />
				<span>{text}</span>
			</button>
		</div>
	);
};

export const GoogleButton = ({ text, className, onClick, icon }) => {
	return (
		<div>
			<a
				onClick={onClick}
				className={`gap-2 flex justify-center items-center rounded-lg p-2 py-3 md:py-4 md:px-5 text-base bg-transparent hover:border-primaryBlue border border-lightGray text-darkGray cursor-pointer transition-all ease-in ${className}`}
			>
				<img src={icon} className="w-5" />
				<span>{text}</span>
			</a>
		</div>
	);
};