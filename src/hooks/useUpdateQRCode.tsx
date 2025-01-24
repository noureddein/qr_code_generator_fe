import { useMutation, useQueryClient } from "@tanstack/react-query";
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
		| (vCardFormDataTypes & { text: string })
		| EmailFormDataTypes
		| TextFormDataTypes;
}

interface MutationContext {
	error?: string;
}

const useUpdateQRCode = ({ URL }: { URL: string }) => {
	const privateServer = usePrivateServer();
	const queryClient = useQueryClient();
	return useMutation<
		{ message: string },
		AxiosError<{ message: string } | ErrorResponse>,
		MutationDataProps,
		MutationContext
	>({
		mutationFn: async ({ data }) => {
			const { id, ...rest } = data;
			const result = await privateServer.put(`${URL}/${id}`, rest);
			return result.data;
		},
		onSuccess: async (_) => {
			await queryClient.invalidateQueries({
				queryKey: ["get_many_qr_codes"],
			});
		},
	});
};

export default useUpdateQRCode;
