import { GenerateQRCodeResponse, User } from "@src/types.d";
import { LoginFormDataTypes } from "@validation/index";
import { QRDataToSubmit } from "@validation/qrCodeOptions";
import { AxiosResponse } from "axios";
import usePrivateServer from "./usePrivateServer";

export type IdentityResponse = {
	isLoggedIn: boolean;
	user: null | User;
};

const useAPIs = () => {
	const privateServer = usePrivateServer();

	const login = async (data: LoginFormDataTypes) => {
		try {
			const URL = "/api/auth/login";
			const res = await privateServer.post(URL, data);
			return res.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const identity = async (): Promise<IdentityResponse> => {
		try {
			const abort = new AbortController();

			const URL = "/api/auth/identity";
			const res = await privateServer.get(URL, { signal: abort.signal });
			return res.data;
		} catch (error) {
			return { isLoggedIn: false, user: null };
		}
	};

	const logout = async () => {
		try {
			const URL = "/api/auth/logout";
			return privateServer.post(URL);
		} catch (error) {
			throw error;
		}
	};

	async function mutateGenerator(
		data: QRDataToSubmit
	): Promise<GenerateQRCodeResponse> {
		try {
			const URL = "/api/generate";
			const result: AxiosResponse<GenerateQRCodeResponse> =
				await privateServer.post(URL, data);
			return result.data;
		} catch (error: any) {
			throw error;
		}
	}

	const deleteQRCode = async (ids: string[]): Promise<AxiosResponse> => {
		try {
			const URL = `/api/qr-codes/delete/bulk`;
			const result = await privateServer.post(URL, { ids });
			return result;
		} catch (error) {
			throw error;
		}
	};

	return { login, logout, identity, mutateGenerator, deleteQRCode };
};

export default useAPIs;
export type UseAPIs = ReturnType<typeof useAPIs>;
