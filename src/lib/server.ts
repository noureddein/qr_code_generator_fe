import axios from "axios";

// const baseURL = "http://localhost:3000";
const baseURL = "https://qr-code-generator-nx2c.onrender.com";

export const server = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	// withCredentials: true,
});

export const privateServer = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
