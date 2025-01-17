import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@src/types.d";
import toast from "react-hot-toast";

export interface MutationDataProps {
	ids: string[];
	status: boolean;
}

const useUpdateActivation = () => {
	const privateServer = usePrivateServer();
	const queryClient = useQueryClient();

	return useMutation<
		AxiosResponse,
		AxiosError<{ message: string } | ErrorResponse>,
		MutationDataProps
	>({
		mutationFn: async (data) => {
			const URL = `/api/qr-codes/activation`;

			const result = await privateServer.put<AxiosResponse>(URL, data);
			return result.data;
		},
		onSuccess: async (res) => {
			console.log(res);
			await queryClient.invalidateQueries({
				queryKey: ["get_many_qr_codes"],
			});
		},
		onError: (err) => {
			toast.error(err.response?.data.message as string);
			console.log(err);
		},
	});
};

export default useUpdateActivation;
