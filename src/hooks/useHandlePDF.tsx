import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@src/types.d";

interface MutationContext {
	error?: string;
}

const useHandlePDF = () => {
	const privateServer = usePrivateServer();
	const queryClient = useQueryClient();

	const handleSavePdf = useMutation<
		AxiosResponse,
		AxiosError<ErrorResponse>,
		FormData,
		MutationContext
	>({
		mutationFn: async (data: FormData) => {
			try {
				const URL = "/api/qr-codes/save/pdf";

				const result = await privateServer.post(URL, data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				return result;
			} catch (error) {
				throw error;
			}
		},
		onError: (err) => {
			console.log(err);
			toast.error(err.response?.data?.message as string);
		},
		onSuccess: (response) => {
			toast.success(response.data.message);
		},
	});

	const handleUpdatePdf = useMutation<
		AxiosResponse,
		AxiosError<ErrorResponse>,
		{ formData: FormData; id: string },
		MutationContext
	>({
		mutationFn: async ({
			formData,
			id,
		}: {
			formData: FormData;
			id: string;
		}) => {
			try {
				const URL = `/api/qr-codes/pdf/${id}`;

				const result = await privateServer.put(URL, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				return result;
			} catch (error) {
				throw error;
			}
		},
		onError: (err) => {
			console.log(err);
			toast.error(err.response?.data?.message as string);
		},
		onSuccess: async (response) => {
			toast.success(response.data.message);
			await queryClient.invalidateQueries({
				queryKey: ["get_many_qr_codes"],
			});
		},
	});

	return {
		handleSavePdf,
		handleUpdatePdf,
	};
};

export default useHandlePDF;
