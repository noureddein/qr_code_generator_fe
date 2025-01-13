import Input from "@components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import useSaveQrCode from "@hooks/useSaveQrCode";
import { ErrorResponse, QRCodeTypes } from "@src/types.d";
import { TextFormDataTypes, textSchema } from "@validation/qrCodeOptions";
import { Accordion } from "flowbite-react/components/Accordion";
import { Spinner } from "flowbite-react/components/Spinner";
import { useForm } from "react-hook-form";

const TextForm = ({ data }: { data?: TextFormDataTypes }) => {
	const initialValues: TextFormDataTypes = data || {
		name: "",
		text: "",
	};
	const {
		mutate: saveQR,
		isPending: isSaving,
		isError,
		context,
	} = useSaveQrCode();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
		setError,
	} = useForm<TextFormDataTypes>({
		resolver: zodResolver(textSchema),
		defaultValues: initialValues,
	});

	const onSubmit = (data: TextFormDataTypes) => {
		const dataToSave = {
			qrData: data,
			type: QRCodeTypes.TEXT,
		};
		saveQR(dataToSave, {
			onSuccess: () => reset(),
			onError: (err) => {
				const errStatus = err.response?.status as number;
				const responseData = err.response?.data as ErrorResponse;
				if (errStatus >= 409) {
					responseData.errors.forEach((err: any) => {
						setError(err.path, { message: err.msg });
					});
				}
			},
		});
	};
	return (
		<form
			className="bg-gray-300 rounded-md min-h-96"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex">
				<div className="flex-auto w-full p-4">
					<Input
						id="name"
						label="QR Code name"
						register={register}
						errors={errors}
						inputProps={{ placeholder: "Name" }}
						containerClass={{ className: "mb-3" }}
					/>
					<Accordion>
						<Accordion.Panel>
							<Accordion.Title>Enter Content</Accordion.Title>
							<Accordion.Content>
								<div>
									<label
										htmlFor="text"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your message
									</label>
									<textarea
										id="text"
										rows={4}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
										{...register("text", {
											required: true,
										})}
									></textarea>

									{errors.text && (
										<span className="text-sm text-red-500 ps-2">
											{errors.text.message}
										</span>
									)}
								</div>
							</Accordion.Content>
						</Accordion.Panel>
					</Accordion>

					{isError && (
						<p className="my-4 text-red-600 ">{context?.error}</p>
					)}
					<div className="flex mt-4">
						<button
							disabled={!isValid || isSaving}
							type="submit"
							className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed me-0 ms-auto"
						>
							{isSaving ? <Spinner color="gray" /> : "Save"}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default TextForm;
