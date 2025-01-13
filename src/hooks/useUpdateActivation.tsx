import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@src/types.d";

const useUpdateActivation = ({ id }: { id: string }) => {
	const privateServer = usePrivateServer();
	const queryClient = useQueryClient();
	return useMutation<
		AxiosResponse,
		AxiosError<{ message: string } | ErrorResponse>
	>({
		mutationFn: async () => {
			const URL = `/api/qr-codes/activation/${id}`;

			const result = await privateServer.put<AxiosResponse>(URL);
			return result.data;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get_many_qr_codes"],
			});
		},
	});
};

export default useUpdateActivation;
