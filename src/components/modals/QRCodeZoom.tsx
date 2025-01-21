import useDiscloser from "@hooks/useDiscloser";
import { CustomFlowbiteTheme, Spinner } from "flowbite-react";
import { Modal } from "flowbite-react/components/Modal";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

interface QRCodeZoomProps {
	image: string;
}

const customTheme: CustomFlowbiteTheme["modal"] = {
	root: {
		base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full ",
		show: {
			on: "flex bg-gray-900 bg-opacity-50 backdrop-blur-sm",
			off: "hidden",
		},
	},
	content: {
		base: "relative h-full w-full md:h-auto ",
		inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-transparent",
	},
};

const QRCodeZoom = ({ image }: QRCodeZoomProps) => {
	const { onClose, onOpen, open } = useDiscloser();
	const [isCopying, setIsCopying] = useState<boolean>(false);

	const onCopyToClipboard = async () => {
		const mimeType = "image/png";
		try {
			setIsCopying(true);

			setTimeout(async () => {
				// Decode Base64 to a binary string
				const byteCharacters = atob(image.split(",")[1]); // Remove the "data:image/png;base64," prefix
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}

				// Convert the binary string to a Blob
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray], { type: mimeType });

				// Create a ClipboardItem with the image blob
				const clipboardItem = new ClipboardItem({ [blob.type]: blob });

				// Write the ClipboardItem to the clipboard
				await navigator.clipboard.write([clipboardItem]);

				setIsCopying(false);
				toast.success("Image copied to clipboard.");
			}, 500);
		} catch (error) {
			setIsCopying(false);
			toast.error("Unable to copy image.");
			console.error("Failed to copy Base64 image to clipboard:", error);
		}
	};

	return (
		<>
			<div className="w-full col-span-12 md:col-span-6 lg:col-span-2">
				<div className="relative mx-auto w-fit group/zoom">
					<img
						className="mx-auto shadow-xl md:ms-0 md:h-auto md:w-32 md:rounded-none size-64"
						src={image}
						alt=""
					/>
					<div className="absolute bottom-0 right-0 hidden group-hover/zoom:block">
						<div className="flex flex-row items-center justify-center gap-2 p-1 bg-green-600">
							<MdOutlineZoomOutMap
								className="text-gray-200  size-4 hover:cursor-pointer hover:scale-[1.1] "
								onClick={onOpen}
							/>
							{isCopying ? (
								<Spinner className="size-4" />
							) : (
								<FaCopy
									onClick={onCopyToClipboard}
									className="  text-gray-200 size-4 hover:cursor-pointer hover:scale-[1.1] "
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<Modal show={open} size="md" theme={customTheme} onClick={onClose}>
				<Modal.Body onClick={(e) => e.stopPropagation()}>
					<img className="size-96" src={image} alt="" />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default QRCodeZoom;
