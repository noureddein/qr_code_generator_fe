import { useEffect } from "react";
import { URLQrData } from "./view.d";
import { InfiniteSpinnerIcon } from "@components/Icons";
import Container from "@components/Container";

const URLView = ({ qrData }: { qrData: URLQrData }) => {
	if (!qrData.url) {
		// Handle the case where the URL is missing
		return <p>URL not found</p>;
	}

	// Redirect to the URL using useEffect to avoid side effects during render
	useEffect(() => {
		window.location.href = qrData.url;
	}, [qrData.url]);

	return (
		<div className="flex items-center justify-center min-h-dvh bg-slate-100">
			<Container>
				<div className="flex items-center justify-center h-full ">
					<InfiniteSpinnerIcon />
				</div>
			</Container>
		</div>
	);
};

export default URLView;
