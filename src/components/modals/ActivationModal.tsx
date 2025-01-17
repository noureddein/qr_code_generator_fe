import { ActiveIcon, DeactivateIcon } from "@components/Icons";
import useDiscloser from "@hooks/useDiscloser";
import useUpdateActivation from "@hooks/useUpdateActivation";
import { Status as StatusType } from "@src/constants";
import { Button } from "flowbite-react/components/Button";
import { Modal } from "flowbite-react/components/Modal";
import { Spinner } from "flowbite-react/components/Spinner";

interface DeleteModalProps {
	ids: string[];
	childrenButton?:
		| React.ReactNode
		| ((onOpen: () => void) => React.ReactNode);
	status: boolean;
}

function ActivationModal({ ids, status, childrenButton }: DeleteModalProps) {
	const { onClose, onOpen, open } = useDiscloser();
	const { mutate, isPending } = useUpdateActivation();

	const onDeleteQR = async () => {
		mutate({ ids, status });
	};
	return (
		<>
			{typeof childrenButton === "function" ? (
				childrenButton(onOpen)
			) : (
				<Button onClick={onOpen} color="blue">
					Toggle modal
				</Button>
			)}

			<Modal show={open} size="md" onClose={onClose} popup>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						{status === StatusType.ACTIVE ? (
							<ActiveIcon className="mx-auto mb-4 text-green-600 h-14 w-14 dark:text-gray-200" />
						) : (
							<DeactivateIcon className="mx-auto mb-4 text-red-600 h-14 w-14 dark:text-gray-200" />
						)}
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							{status === StatusType.ACTIVE
								? "Are you sure you want to activate selected QR codes?"
								: "Are you sure you want to deactivate selected QR codes?"}
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

export default ActivationModal;
