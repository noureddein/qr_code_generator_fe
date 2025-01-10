import { useState } from "react";

const useDiscloser = () => {
	const [open, setOpen] = useState(false);

	const onClose = () => setOpen(false);
	const onOpen = () => setOpen(true);

	return { open, onClose, onOpen };
};

export default useDiscloser;
