import Input from "@components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import useSaveQrCode from "@hooks/useSaveQrCode";
import useUpdateQRCode from "@hooks/useUpdateQRCode";
import { defaultQROpts } from "@src/constants";
import { ErrorResponse, QRCodeTypes } from "@src/types.d";
import { useQueryClient } from "@tanstack/react-query";
import { URLFormDataTypes, urlSchema } from "@validation/qrCodeOptions";
import { Spinner } from "flowbite-react/components/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const URLForm = ({ data }: { data?: URLFormDataTypes }) => {
	const initialValues: URLFormDataTypes = data || {
		...defaultQROpts,
		qrName: "",
		url: "https://www.easyproject.cn",
	};
	const queryClient = useQueryClient();
	const {
		mutate: saveQR,
		isPending: isSaving,
		isError,
		context,
	} = useSaveQrCode();

	const { mutate: updateQR, isPending: isUpdating } = useUpdateQRCode();
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isValid },
	} = useForm<URLFormDataTypes>({
		resolver: zodResolver(urlSchema),
		defaultValues: initialValues,
	});

	const onSave = async (data: URLFormDataTypes) => {
		const { url, ...rest } = data;
		const dataToSave = {
			data: data,
			type: QRCodeTypes.URL,
			qrOptions: {
				text: url,
				...rest,
			},
		};
		saveQR(dataToSave, {
			onSuccess: (res) => {
				toast.success(res.data.message);
				reset();
			},
			onError: (err) => {
				const errStatus = err.response?.status as number;
				const responseData = err.response?.data as ErrorResponse;
				if (errStatus >= 409 && errStatus < 500) {
					responseData.errors.forEach((err: any) => {
						setError(err.path, { message: err.msg });
					});
				} else {
					toast.error(responseData?.message || "");
				}
			},
		});
	};

	const onUpdate = (data: URLFormDataTypes) => {
		updateQR(
			{ data },

			{
				onSuccess: async (res) => {
					await queryClient.invalidateQueries({
						queryKey: ["get_many_qr_codes"],
					});
					console.log(res);
					toast.success(res.message);
				},
				onError: (err) => {
					const errStatus = err.response?.status as number;
					const responseData = err.response?.data as ErrorResponse;
					if (errStatus >= 409 && errStatus < 500) {
						responseData.errors.forEach((err: any) => {
							setError(err.path, { message: err.msg });
						});
					} else {
						toast.error(responseData?.message || "");
					}
				},
			}
		);
	};

	const onSubmit = (data: URLFormDataTypes) => {
		if (initialValues.id) {
			onUpdate(data);
		} else {
			onSave(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col">
				<div className="flex-auto w-full p-4">
					<Input
						id="qrName"
						label="QR Code name"
						register={register}
						errors={errors}
						inputProps={{ placeholder: "Name" }}
						containerClass={{ className: "mb-3" }}
					/>
					<Input
						id="url"
						type="url"
						label="Your URL"
						register={register}
						errors={errors}
						inputProps={{
							placeholder: "https://www.flowbite.com",
						}}
					/>

					{isError && (
						<p className="my-4 text-red-600 ">{context?.error}</p>
					)}
					<div className="flex mt-4">
						<button
							disabled={!isValid || isSaving || isUpdating}
							type="submit"
							className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed me-0 ms-auto"
						>
							{isSaving || isUpdating ? (
								<Spinner color="gray" />
							) : (
								"Save"
							)}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default URLForm;
