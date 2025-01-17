import useDiscloser from "@hooks/useDiscloser";
import { CustomFlowbiteTheme } from "flowbite-react";
import { Modal } from "flowbite-react/components/Modal";
import { MdOutlineZoomOutMap } from "react-icons/md";

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

	return (
		<>
			<div className="w-full col-span-12 md:col-span-6 lg:col-span-2">
				<div className="relative mx-auto w-fit group/zoom">
					<img
						className="mx-auto shadow-xl md:ms-0 md:h-auto md:w-32 md:rounded-none size-64"
						src={image}
						alt=""
					/>

					<MdOutlineZoomOutMap
						className="group-hover/zoom:block absolute bottom-0 right-0 text-gray-700 bg-gray-300 size-8 hover:cursor-pointer hover:scale-[1.1] hidden"
						onClick={onOpen}
					/>
				</div>
			</div>
			<Modal
				show={open}
				size="md"
				// onClose={onClose}
				theme={customTheme}
				onClick={onClose}
			>
				<Modal.Body onClick={(e) => e.stopPropagation()}>
					<img className="size-96" src={image} alt="" />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default QRCodeZoom;
