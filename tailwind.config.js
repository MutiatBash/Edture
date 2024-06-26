/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"trap-grotesk": ['"Trap Grotesk"', "sans-serif"],
			},
			fontWeight: {
				light: 300,
				regular: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
				extrabold: 800,
				black: 900,
			},
		},
		colors: {
			primaryBlue: "#4356FF",
			hoverBlue: "#6272FF",
			secondaryHoverBlue: "#D9DDFF",
			gray: "#C0C0C0",
			primaryBlack: "#191919",
			lightGray: "#B3B3B3",
			darkGray: "#2C2C2C",
			white: "#ffffff",
			green: "#569537",
			red: "#EE2B2B",
			lighterGray: "#EDEDED",
			borderJoinedComm: "#CACACA",
		},
	},
	plugins: [],
};
