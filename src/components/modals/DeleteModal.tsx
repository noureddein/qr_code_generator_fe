import { Button } from "flowbite-react/components/Button";
import { Modal } from "flowbite-react/components/Modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import useDiscloser from "@hooks/useDiscloser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "flowbite-react/components/Spinner";
import useAPIs from "@hooks/useAPIs";
import toast from "react-hot-toast";
import axios from "axios";

interface DeleteModalProps {
	id: string;
	childrenButton?:
		| React.ReactNode
		| ((onOpen: () => void) => React.ReactNode);
	qrName?: string;
}

function DeleteModal({ id, childrenButton, qrName }: DeleteModalProps) {
	const queryClient = useQueryClient();
	const { deleteQRCode } = useAPIs();
	const { onClose, onOpen, open } = useDiscloser();

	const { mutate, isPending } = useMutation({
		mutationFn: deleteQRCode,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["get_many_qr_codes"],
			});
			toast.success(`\"${qrName}\" deleted successfully`);
		},
		onError: (err) => {
			console.log(err);
			if (axios.isAxiosError(err)) {
				toast.error(
					err.response?.data?.message ||
						`Error wile deleting \"${qrName}\"`
				);
			}
		},
	});

	const onDeleteQR = async () => {
		mutate(id);
	};

	return (
		<>
			{typeof childrenButton === "function" ? (
				childrenButton(onOpen)
			) : (
				<Button onClick={onOpen}>Toggle modal</Button>
			)}

			<Modal show={open} size="md" onClose={onClose} popup>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
						<h2 className="mb-5 text-2xl font-medium text-gray-700 capitalize">
							{qrName}
						</h2>
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this QR Code?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={onDeleteQR}
								disabled={isPending}
							>
								{isPending ? (
									<Spinner color="gray" />
								) : (
									"Yes, I'm sure"
								)}
							</Button>
							<Button
								color="gray"
								onClick={onClose}
								disabled={isPending}
							>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default DeleteModal;
