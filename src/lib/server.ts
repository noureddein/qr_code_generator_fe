import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const server = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const privateServer = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
