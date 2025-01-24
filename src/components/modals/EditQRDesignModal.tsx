import QRImageConfig from "@components/QRImageConfig";
import QRImageResizer from "@components/QRImageRsieer";
import FileUpload from "@components/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import useDiscloser from "@hooks/useDiscloser";
import useHandleQRDesign from "@hooks/useHandleQRDesign";
import { fileToBase64 } from "@lib/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { qrCodeOptions, QRCodeOptionsTypes } from "@validation/qrCodeOptions";
import { Button } from "flowbite-react/components/Button";
import { Modal } from "flowbite-react/components/Modal";
import { Spinner } from "flowbite-react/components/Spinner";
import { useState } from "react";
import {
	FieldValues,
	Path,
	PathValue,
	useForm,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import ModalLoader from "../loaders/ModalLoader";

interface ImageGalleryProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	setValue: UseFormSetValue<T>;
	icons: string[];
}

const ImageGallery = <T extends FieldValues>({
	icons,
	setValue,
}: ImageGalleryProps<T>) => {
	const [selectedIcon, setSelectedIcon] = useState<null | string>();

	const onSelectImage = async (src: string | null) => {
		if (!src) {
			setSelectedIcon(null);
			setValue("logoBase64" as Path<T>, "" as PathValue<T, Path<T>>);
			setValue("logo" as Path<T>, undefined as PathValue<T, Path<T>>);
			return;
		}
		const response = await fetch(src);
		const blob = await response.blob();

		// Read the blob as a Base64 string using FileReader
		const reader = new FileReader();
		reader.onloadend = () => {
			setSelectedIcon(src);
			setValue(
				"logoBase64" as Path<T>,
				reader.result as PathValue<T, Path<T>>
			);
			setValue("logo" as Path<T>, undefined as PathValue<T, Path<T>>);
		};

		reader.onerror = (err) => {
			console.log(err);
			toast.error("Unable to select icon");
			setSelectedIcon(null);
			setValue("logoBase64" as Path<T>, "" as PathValue<T, Path<T>>);
		};
		reader.readAsDataURL(blob);
	};
	return (
		<div className="flex flex-row flex-wrap gap-2 my-4">
			<img
				src={"/src/assets/none.png"}
				alt={"no-image"}
				className={twMerge(
					"p-1 border-2 rounded-sm cursor-pointer bg-gray-100/50 size-12 hover:bg-gray-200",
					selectedIcon === null ? "border-green-500" : ""
				)}
				onClick={() => onSelectImage(null)}
			/>
			{icons.map((src, index) => (
				<img
					key={index}
					src={src}
					alt={src}
					className={twMerge(
						"p-1 border-2 rounded-sm cursor-pointer bg-gray-100/50 size-12 hover:bg-gray-200",
						selectedIcon === src ? "border-green-500" : ""
					)}
					onClick={() => onSelectImage(src)}
				/>
			))}
		</div>
	);
};
interface EditQRCodeModalProps {
	id: string;
	childrenButton?:
		| React.ReactNode
		| ((onOpen: () => void) => React.ReactNode);
}

function EditQRDesignModal({ id, childrenButton }: EditQRCodeModalProps) {
	const { onClose, onOpen, open } = useDiscloser();
	const { fetchQRDesign } = useHandleQRDesign<{
		qrCodeDesign: QRCodeOptionsTypes;
		image: string;
		icons: string[];
	}>({
		id,
		enabled: Boolean(id && open),
	});
	const { data, isPending } = fetchQRDesign;
	return (
		<>
			{typeof childrenButton === "function" ? (
				childrenButton(onOpen)
			) : (
				<Button onClick={onOpen}>Toggle modal</Button>
			)}

			<Modal show={open} size="6xl" onClose={onClose} popup>
				<Modal.Header>
					<p className="text-2xl font-medium">Design Your Code</p>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col gap-2 mt-4">
						<ModalLoader isLoading={isPending}>
							{data && (
								<DesignForm
									id={id}
									initialValues={{
										...data?.qrCodeDesign,
										logoBase64: "",
									}}
									image={data.image}
									onClose={onClose}
									icons={data.icons}
								/>
							)}
						</ModalLoader>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

interface DesignFormProps {
	initialValues: QRCodeOptionsTypes;
	image: string;
	id: string;
	icons: string[];
	onClose: () => void;
}

const DesignForm = ({
	initialValues,
	image,
	id,
	icons,
	onClose,
}: DesignFormProps) => {
	const [img, setImg] = useState(image);
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		reset,
		watch,
		getValues,
		setValue,
		formState: { isValid, errors },
	} = useForm<QRCodeOptionsTypes>({
		resolver: zodResolver(qrCodeOptions),
		defaultValues: initialValues,
		mode: "all",
		reValidateMode: "onChange",
	});

	const { generate, save } = useHandleQRDesign({ id });
	const { isPending: isGenerating, mutate } = generate;
	const { isPending: isSaving, mutate: onUpdate } = save;
	const onSubmit = async (values: QRCodeOptionsTypes) => {
		if (values.logo?.[0]) {
			const convertResult = await fileToBase64(values.logo[0]);
			values.logoBase64 = convertResult.base64;
		} else {
			values.logo = undefined;
		}

		onUpdate(
			{ ...values, id },
			{
				onSuccess: async () => {
					await queryClient.invalidateQueries({
						queryKey: ["get_many_qr_codes"],
					});
					onClose();
				},
			}
		);
	};

	const onGenerate = async () => {
		if (isValid) {
			const values = getValues();

			if (values.logo?.[0]) {
				const convertResult = await fileToBase64(values.logo[0]);
				values.logoBase64 = convertResult.base64;
			} else {
				values.logo = undefined;
			}
			mutate(
				{ ...values, id },
				{
					onSuccess: (res) => {
						const {
							colorDark,
							colorLight,
							dots,
							quietZone,
							quietZoneColor,
							size,
							logoBase64,
						} = res.qrDesign;
						reset({
							colorDark,
							colorLight,
							dots,
							quietZone,
							quietZoneColor,
							size,
							logoBase64,
						});
						setImg(res.image);
					},
				}
			);
		} else {
			toast.error("Invalid options.");
		}
	};

	const quietZone = watch("quietZone");
	const size = watch("size");
	const dots = watch("dots");

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col h-full gap-4 md:flex-row">
				<div className="flex-auto w-full pr-6 border-r-2 md:w-36">
					<div className="flex flex-col items-center justify-center mb-4 ">
						<img
							className="border-2 aspect-square size-60"
							src={img}
							alt="Qr code image"
						/>
					</div>
					<QRImageResizer register={register} size={size} />
				</div>
				<div className="flex-auto w-full md:w-64">
					<QRImageConfig
						register={register}
						quietZone={quietZone}
						dots={dots}
					/>

					<div>
						<h5 className="mb-2 font-medium">Logo</h5>
						<FileUpload
							errors={errors}
							helperText="SVG, PNG, or JPG (MAX. 400x400px)."
							id="logo"
							label="Upload logo"
							register={register}
						/>

						<ImageGallery
							register={register}
							setValue={setValue}
							icons={icons}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<button
					type="button"
					disabled={isSaving || isGenerating}
					onClick={onGenerate}
					className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed "
				>
					{isGenerating ? <Spinner color="gray" /> : "Generate"}
				</button>
				<button
					disabled={isSaving || isGenerating}
					type="submit"
					className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed "
				>
					{isSaving ? <Spinner color="gray" /> : "Save"}
				</button>
			</div>
		</form>
	);
};

export default EditQRDesignModal;
