import axios from "axios";

// const baseURL = "http://localhost:3000";
const baseURL = import.meta.env.VITE_BASE_URL;

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
