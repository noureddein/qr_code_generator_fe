import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QRCodeOptionsTypes } from "@validation/qrCodeOptions";
import { AxiosError, AxiosResponse } from "axios";
import usePrivateServer from "./usePrivateServer";
import toast from "react-hot-toast";
import { ErrorResponse } from "@src/types.d";

interface UseFetchQRCodeProps {
	id: string;
	enabled?: boolean;
}

interface MutationContext {
	error?: string;
}

export interface GenerateResponse {
	image: string;
	qrDesign: QrDesign;
}

export interface QrDesign {
	colorDark: string;
	colorLight: string;
	quietZoneColor: string;
	size: number;
	dots: number;
	quietZone: number;
	logoBase64: string;
}

const useHandleQRDesign = <TResponse,>({
	id,
	enabled = true,
}: UseFetchQRCodeProps) => {
	const privateServer = usePrivateServer();
	const queryClient = useQueryClient();

	const fetchQRDesign = useQuery<
		TResponse,
		AxiosError,
		TResponse,
		[string, { id: string }]
	>({
		queryKey: ["get_one_qr_code_design", { id }],
		queryFn: async ({ signal, queryKey }) => {
			const { id } = queryKey[1] || {};
			if (!id) {
				throw new Error("ID is required to fetch the QR Code.");
			}
			const URL = `/api/qr-codes/design/${id}`;
			const result = await privateServer.get(URL, { signal });
			return result.data;
		},
		enabled,
	});

	const generate = useMutation({
		mutationFn: async (data: { id: string } & QRCodeOptionsTypes) => {
			try {
				const URL = "/api/qr-codes/design/generate";
				const response = await privateServer.post<GenerateResponse>(
					URL,
					data
				);

				return response.data;
			} catch (error) {
				throw error;
			}
		},
		onMutate: async (): Promise<MutationContext> => {
			// Return a context object to be used in onError or onSettled
			return { error: undefined };
		},
		// onError: (err, _, ctx) => {
		// 	const data = err.response?.data;
		// 	if (data && "message" in data && ctx) {
		// 		ctx.error = data.message as string;
		// 	}
		// },
	});

	interface MutationDataProps extends QRCodeOptionsTypes {
		id: string;
	}

	const save = useMutation<
		AxiosResponse,
		AxiosError<ErrorResponse>,
		MutationDataProps,
		MutationContext
	>({
		mutationFn: async (data): Promise<AxiosResponse> => {
			try {
				const URL = `/api/qr-codes/design/${data.id}`;
				const response = await privateServer.put<AxiosResponse>(
					URL,
					data
				);

				return response;
			} catch (error) {
				throw error;
			}
		},
		onMutate: async (): Promise<MutationContext> => {
			// Return a context object to be used in onError or onSettled
			return { error: undefined };
		},
		onSuccess: async (res: AxiosResponse<{ message: string }>) => {
			toast.success(res.data.message);
			await queryClient.invalidateQueries({
				queryKey: ["get_many_qr_codes"],
			});
			await queryClient.invalidateQueries({
				queryKey: ["get_one_qr_code_design", { id }],
			});
		},
		onError: (err: AxiosError, _, ctx) => {
			const data = err.response;
			console.log(err);
			if (data && "message" in data && ctx) {
				ctx.error = data.message as string;
			}
		},
	});

	return { fetchQRDesign, generate, save };
};

export default useHandleQRDesign;
