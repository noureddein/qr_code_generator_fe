import { useMutation } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import {
	URLFormDataTypes,
	vCardFormDataTypes,
	EmailFormDataTypes,
	TextFormDataTypes,
} from "@validation/qrCodeOptions";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, QRCodeTypes } from "@src/types.d";

export interface MutationDataProps {
	qrData: {
		text: string;
	} & (
		| URLFormDataTypes
		| vCardFormDataTypes
		| EmailFormDataTypes
		| TextFormDataTypes
	);
	type: QRCodeTypes;
}

interface MutationContext {
	error?: string;
}

const useSaveQrCode = () => {
	const privateServer = usePrivateServer();
	return useMutation<
		AxiosResponse,
		AxiosError<ErrorResponse>,
		MutationDataProps | FormData,
		MutationContext
	>({
		mutationFn: async (data: MutationDataProps | FormData) => {
			try {
				const URL = "/api/qr-codes/save";

				// Send the appropriate payload
				const response = await privateServer.post(URL, data);
				return response;
			} catch (error) {
				throw error;
			}
		},
		onMutate: async (): Promise<MutationContext> => {
			// Return a context object to be used in onError or onSettled
			return { error: undefined };
		},
		onError: (err, _, ctx) => {
			const data = err.response?.data;
			if (data && "message" in data && ctx) {
				ctx.error = data.message as string;
			}
		},
	});
};

export default useSaveQrCode;
