import { useQuery } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import { AxiosError } from "axios";

interface UseFetchQRCodeProps {
	id: string;
	enabled: boolean;
}

const useFetchQRCode = <TResponse,>({ id, enabled }: UseFetchQRCodeProps) => {
	const privateServer = usePrivateServer();
	return useQuery<TResponse, AxiosError, TResponse, [string, { id: string }]>(
		{
			queryKey: ["get_one_qr_code", { id }],
			queryFn: async ({ signal, queryKey }) => {
				const { id } = queryKey[1] || {};
				if (!id) {
					throw new Error("ID is required to fetch the QR Code.");
				}
				const URL = `/api/qr-codes/${id}`;
				const result = await privateServer.get(URL, { signal });
				return result.data;
			},
			enabled,
		}
	);
};

export default useFetchQRCode;
