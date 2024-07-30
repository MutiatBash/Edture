export const truncateString = (str, num) => {
	if (str?.length <= num) {
		return str;
	}
	return str?.slice(0, num) + "...";
};

export const formatVideoDuration = (seconds) => {
	if (seconds === undefined || seconds === null || isNaN(seconds)) {
		return "0:00";
	}

	const roundedSeconds = Math.round(seconds); 
	const hours = Math.floor(roundedSeconds / 3600);
	const minutes = Math.floor((roundedSeconds % 3600) / 60);
	const remainingSeconds = roundedSeconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
			remainingSeconds < 10 ? "0" : ""
		}${remainingSeconds}`;
	}

	return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
