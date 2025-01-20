import Input from "@components/Input";
import FileUpload from "@components/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import useHandlePDF from "@hooks/useHandlePDF";
import { ErrorResponse, PDFQRData } from "@src/types";
import { PDFFormDataTypes, PDFSchema } from "@validation/qrCodeOptions";
import { Spinner } from "flowbite-react/components/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface PDFFormProps {
	data?: PDFQRData;
	onCloseModal?: () => void;
}

const PDFForm = ({ data, onCloseModal }: PDFFormProps) => {
	const initialValues: PDFFormDataTypes = {
		id: data?.id,
		name: data?.name || "",
		file: new DataTransfer().files,
	};
	const isUpdatePDF = Boolean(data?.id);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isValid },
	} = useForm<PDFFormDataTypes>({
		resolver: zodResolver(PDFSchema),
		defaultValues: initialValues,
		mode: "onChange",
		reValidateMode: "onChange",
		criteriaMode: "all",
	});
	const { handleSavePdf, handleUpdatePdf } = useHandlePDF();
	const {
		mutateAsync,
		context,
		isError,
		isPending: isSaving,
	} = handleSavePdf;

	const {
		mutateAsync: updateAsync,
		context: updateContext,
		isError: isUpdateError,
		isPending: isUpdating,
	} = handleUpdatePdf;

	const onSave = async (values: PDFFormDataTypes) => {
		const formData = new FormData();
		if (values?.file?.[0]) formData.append("file", values.file[0]);
		formData.append("name", values.name);
		await mutateAsync(formData, {
			onSuccess: () => {
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

	const onUpdate = async (values: PDFFormDataTypes) => {
		const formData = new FormData();
		formData.append("name", values.name);

		if (values.file?.[0]) {
			formData.append("file", values.file[0]);
		}

		// Check for typescript
		if (values.id) {
			await updateAsync(
				{ formData, id: values.id },
				{
					onSuccess: () => onCloseModal && onCloseModal(),
					onError: (err) => {
						const errStatus = err.response?.status as number;
						const responseData = err.response
							?.data as ErrorResponse;
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
		}
	};

	const onSubmit = async (values: PDFFormDataTypes) => {
		if (values.id) {
			await onUpdate(values);
		} else {
			await onSave(values);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex">
				<div className="flex-auto w-full gap-2 p-4">
					<div className="flex flex-col gap-3">
						<Input
							id="name"
							label="QR Code name"
							register={register}
							errors={errors}
							inputProps={{ placeholder: "QR Code name" }}
						/>
						<FileUpload
							errors={errors}
							id="file"
							label={isUpdatePDF ? "PDF file" : "Update PDF"}
							register={register}
							inputProps={{
								accept: ".pdf",
								multiple: false,
							}}
							helperText="PDF (MAX. 5MB)."
						/>
						{isUpdatePDF && (
							<a
								href={data?.text}
								title="Link"
								target="_blank"
								className="px-4 py-2 text-gray-600 bg-gray-200 w-fit hover:underline hover:underline-offset-1"
							>
								Preview saved PDF
							</a>
						)}
					</div>
					{(isError || isUpdateError) && (
						<p className="my-4 text-red-600 ">
							{context?.error || updateContext?.error}
						</p>
					)}
					<div className="flex mt-4">
						<button
							disabled={
								isUpdatePDF ? isUpdating : !isValid || isSaving
							}
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

export default PDFForm;
