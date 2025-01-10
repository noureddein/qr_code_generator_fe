import { privateServer } from "@lib/server";
import useRefreshToken from "./useRefreshToken";
// import { useAccessToken } from "@providers/AuthProvider";
import { useEffect } from "react";
import { AxiosError } from "axios";
import useAuth from "@store/authStore";

const usePrivateServer = () => {
	const refresh = useRefreshToken();
	const accessToken = useAuth((s) => s.accessToken);

	useEffect(() => {
		const responseIntercept = privateServer.interceptors.response.use(
			(res) => res,
			async (error: AxiosError) => {
				const prevRequest = error?.config;

				// Check if error is 401 Unauthorized and we have a previous request
				if (error?.response?.status === 401 && prevRequest) {
					try {
						// Get new access token using refresh token
						const newAccessToken = await refresh();

						if (!newAccessToken) {
							return Promise.reject(error);
						}

						// Update Authorization header with new token
						prevRequest.headers["Authorization"] =
							`Bearer ${newAccessToken}`;

						// Retry the original request with new token
						return privateServer(prevRequest);
					} catch (refreshError) {
						// If refresh token fails, reject with original error
						return Promise.reject(error);
					}
				}
				return Promise.reject(error);
			}
		);

		const requestIntercept = privateServer.interceptors.request.use(
			(config) => {
				// Add access token to request if not already present
				if (!config.headers["Authorization"] && accessToken) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		// Cleanup interceptors on unmount
		return () => {
			privateServer.interceptors.response.eject(responseIntercept);
			privateServer.interceptors.request.eject(requestIntercept);
		};
	}, [accessToken, refresh]);

	return privateServer;
};

export default usePrivateServer;
