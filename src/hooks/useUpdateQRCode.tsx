import { useMutation } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import { AxiosError } from "axios";
import { ErrorResponse } from "@src/types.d";
import {
	EmailFormDataTypes,
	TextFormDataTypes,
	URLFormDataTypes,
	vCardFormDataTypes,
} from "@validation/qrCodeOptions";

export interface MutationDataProps {
	data:
		| URLFormDataTypes
		| vCardFormDataTypes
		| EmailFormDataTypes
		| TextFormDataTypes;
}

interface MutationContext {
	error?: string;
}

const useUpdateQRCode = () => {
	const privateServer = usePrivateServer();
	return useMutation<
		{ message: string },
		AxiosError<{ message: string } | ErrorResponse>,
		MutationDataProps,
		MutationContext
	>({
		mutationFn: async (data) => {
			const { id, ...rest } = data.data;
			const URL = `/api/qr-codes/url/${id}`;

			const result = await privateServer.put(URL, rest);
			return result.data;
		},
	});
};

export default useUpdateQRCode;
