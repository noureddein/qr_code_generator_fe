import EmailForm from "@components/forms/EmailForm";
import TextForm from "@components/forms/TextForm";
import URLForm from "@components/forms/URLForm";
import VCardForm from "@components/forms/VCardForm";
import useDiscloser from "@hooks/useDiscloser";
import useFetchQRCode from "@hooks/useFetchQRCode";
import { ResponseRow } from "@src/routes/_wrapper/_authenticated/my-codes";
import { PDFQRData, QRCodeTypes } from "@src/types.d";
import {
	EmailFormDataTypes,
	TextFormDataTypes,
	URLFormDataTypes,
	vCardFormDataTypes,
} from "@validation/qrCodeOptions";
import { Button } from "flowbite-react/components/Button";
import { Modal } from "flowbite-react/components/Modal";
import ModalLoader from "../loaders/ModalLoader";
import PDFForm from "@components/forms/PDFForm";

interface EditQRCodeModalProps {
	id: string;
	childrenButton?:
		| React.ReactNode
		| ((onOpen: () => void) => React.ReactNode);
}

function EditQRCodeModal({ id, childrenButton }: EditQRCodeModalProps) {
	const { onClose, onOpen, open } = useDiscloser();

	const { data: qrData, isPending } = useFetchQRCode<{ row: ResponseRow }>({
		id,
		enabled: Boolean(!!id && open),
	});

	const data = qrData?.row.qrData;

	return (
		<>
			{typeof childrenButton === "function" ? (
				childrenButton(onOpen)
			) : (
				<Button onClick={onOpen}>Toggle modal</Button>
			)}

			<Modal show={open} size="4xl" onClose={onClose} popup>
				<Modal.Header>
					<p className="text-2xl font-medium">Update Your Code</p>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col gap-2">
						<ModalLoader isLoading={isPending}>
							{data && (
								<UpdateForm
									qrCodeType={
										(qrData?.row.type as QRCodeTypes) || ""
									}
									data={{
										...data,
										id: qrData?.row._id as string,
									}}
									onCloseModal={onClose}
								/>
							)}
						</ModalLoader>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

interface UpdateFormProps {
	qrCodeType: QRCodeTypes | "";
	data:
		| URLFormDataTypes
		| vCardFormDataTypes
		| TextFormDataTypes
		| EmailFormDataTypes
		| PDFQRData;
	onCloseModal: () => void;
}

const UpdateForm = ({ qrCodeType, data, onCloseModal }: UpdateFormProps) => {
	switch (qrCodeType) {
		case QRCodeTypes.EMAIL:
			return (
				<EmailForm
					data={data as EmailFormDataTypes}
					onCloseModal={onCloseModal}
				/>
			);

		case QRCodeTypes.TEXT:
			return (
				<TextForm
					data={data as TextFormDataTypes}
					onCloseModal={onCloseModal}
				/>
			);

		case QRCodeTypes.URL:
			return (
				<URLForm
					data={data as URLFormDataTypes}
					onCloseModal={onCloseModal}
				/>
			);

		case QRCodeTypes.VCARD:
			return (
				<VCardForm
					data={data as vCardFormDataTypes}
					onCloseModal={onCloseModal}
				/>
			);

		case QRCodeTypes.PDF:
			return (
				<PDFForm data={data as PDFQRData} onCloseModal={onCloseModal} />
			);

		default:
			return "";
	}
};

export default EditQRCodeModal;
