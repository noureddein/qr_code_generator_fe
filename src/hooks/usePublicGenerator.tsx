import { useMutation } from "@tanstack/react-query";
import useAPIs from "./useAPIs";
import { AxiosError } from "axios";
import { ErrorResponse } from "@src/types.d";

const usePublicGenerator = () => {
	const { mutateGenerator } = useAPIs();

	return useMutation({
		mutationFn: mutateGenerator,
		onError: (err: AxiosError) => {
			const errStatus = err.response?.status as number;
			const responseData = err.response?.data as ErrorResponse;
			if (errStatus >= 409) {
				responseData.errors.forEach((err: any) => {
					// setError(err.path, { message: err.msg });
				});
			}
			if (errStatus === 500) {
				// set500ErrorMsg(err?.response?.data as string);
			}
		},
	});
};

export default usePublicGenerator;
