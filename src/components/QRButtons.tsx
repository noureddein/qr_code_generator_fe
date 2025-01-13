import useAuth from "@store/authStore";
// import { useAccessToken } from "@providers/AuthProvider";

interface QRButtonsProps {
	isPending: boolean;
	// isValid: boolean;
	data: string | undefined;
	isEqualed: boolean;
	// onSave: () => void;
}

const QRButtons = ({
	isPending,
	// data,
	// isValid,
	isEqualed,
	// onSave,
}: QRButtonsProps) => {
	const user = useAuth((s) => s.user);
	// const { auth, isLoading } = useAccessToken();
	// if (isLoading) {
	// 	return (
	// 		<div
	// 			role="status"
	// 			className="flex flex-col max-w-sm gap-1 animate-pulse"
	// 		>
	// 			<div className="w-full bg-green-200 rounded-full h-7 dark:bg-gray-700"></div>
	// 			<div className="w-full bg-green-200 rounded-full h-7 dark:bg-gray-700"></div>
	// 			<div className="w-full bg-green-200 rounded-full h-7 dark:bg-gray-700"></div>
	// 		</div>
	// 	);
	// }
	return (
		<div className="flex flex-col justify-between">
			{/* {
				<button
					disabled={isEqualed || isPending}
					type="submit"
					className="focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
				>
					{isPending ? <Spinner color="gray" /> : "Create QR Code"}
				</button>
			}
			<button
				disabled={isPending || !data}
				type="button"
				className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
				onClick={() => downloadPNG(data)}
			>
				Download PNG
			</button> */}

			{user && (
				<button
					disabled={isPending || !isEqualed}
					type="button"
					className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
					// onClick={onSave}
				>
					Save
				</button>
			)}
		</div>
	);
};

export default QRButtons;
