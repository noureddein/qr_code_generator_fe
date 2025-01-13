import QRImageConfig from "@components/QRImageConfig";
import useDiscloser from "@hooks/useDiscloser";
import { qrCodeOptions, QRCodeOptionsTypes } from "@validation/qrCodeOptions";
import { Button } from "flowbite-react/components/Button";
import { Modal } from "flowbite-react/components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useHandleQRDesign from "@hooks/useHandleQRDesign";
import QRImageResizer from "@components/QRImageRsieer";
import { useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react/components/Spinner";
import ModalLoader from "./ModalLoader";

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
									initialValues={data?.qrCodeDesign}
									image={data.image}
									onClose={onClose}
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
	onClose: () => void;
}

const DesignForm = ({ initialValues, image, id, onClose }: DesignFormProps) => {
	const [img, setImg] = useState(image);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		getValues,
		formState: { isValid },
	} = useForm<QRCodeOptionsTypes>({
		resolver: zodResolver(qrCodeOptions),
		defaultValues: {
			...initialValues,
			...(!initialValues?.dots && { dots: 1 }),
		},
	});

	const { generate, save } = useHandleQRDesign({ id });
	const { isPending: isGenerating, mutate } = generate;
	const { isPending: isSaving, mutate: onUpdate } = save;

	const onSubmit = (values: QRCodeOptionsTypes) => {
		console.log({ values });
		onUpdate(
			{ ...values, id },
			{
				onSuccess: () => onClose(),
			}
		);
	};

	const onGenerate = () => {
		if (isValid) {
			mutate(
				{ ...getValues(), id },
				{
					onSuccess: (res) => {
						const {
							colorDark,
							colorLight,
							dots,
							quietZone,
							quietZoneColor,
							size,
						} = res.qrDesign;
						reset({
							colorDark,
							colorLight,
							dots,
							quietZone,
							quietZoneColor,
							size,
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
			<div className="flex flex-row h-full gap-4">
				<div className="flex-auto pr-6 border-r-2 w-36">
					<div className="flex flex-col items-center justify-center mb-4 ">
						<img
							className="border-2 aspect-square size-60"
							src={img}
							alt="Qr code image"
						/>
					</div>
					<QRImageResizer register={register} size={size} />
				</div>
				<div className="flex-auto w-64">
					<QRImageConfig
						register={register}
						quietZone={quietZone}
						dots={dots}
					/>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<button
					type="button"
					disabled={!isValid || isSaving || isGenerating}
					onClick={onGenerate}
					className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed "
				>
					{isGenerating ? <Spinner color="gray" /> : "Generate"}
				</button>
				<button
					disabled={!isValid || isSaving || isGenerating}
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
