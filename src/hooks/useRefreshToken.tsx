import { server } from "@lib/server";
import useAuth from "@store/authStore";

const useRefreshToken = () => {
	const onSetAccessToken = useAuth((s) => s.onSetAccessToken);

	const refresh = async () => {
		const abort = new AbortController();
		try {
			const response = await server.get("/api/auth/refresh-token", {
				withCredentials: true,
				signal: abort.signal,
			});
			const newToken = response.data?.accessToken;
			onSetAccessToken(newToken);
			return response.data?.accessToken;
		} catch (error) {
			throw error;
		}
	};

	return refresh;
};

export default useRefreshToken;
