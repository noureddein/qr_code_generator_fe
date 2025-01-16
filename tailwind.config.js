const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		flowbite.content(),
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		colors: {
			bordeaux: {
				50: "#fff1f2",
				100: "#ffe3e5",
				200: "#ffccd2",
				300: "#ffa1ae",
				400: "#ff6d83",
				500: "#f93a5b",
				600: "#e71746",
				700: "#c30d3a",
				800: "#a30e38",
				900: "#8b1037",
				950: "#6c0422",
			},

			emerald: {
				50: "#ecfdf5",
				100: "#dcfce7",
				200: "#a7f3d0",
				300: "#6ee7b7",
				400: "#34d399",
				500: "#10b981",
				600: "#059669",
				700: "#047857",
				800: "#065f46",
				900: "#064e3b",
				950: "#022c22",
			},
		},

		extend: {},
	},
	plugins: [flowbite.plugin()],
};
