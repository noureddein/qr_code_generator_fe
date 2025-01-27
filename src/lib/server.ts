import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
// const baseURL = "http://192.168.1.100:3030";

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
