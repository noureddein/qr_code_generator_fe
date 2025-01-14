import { useEffect } from "react";
import { URLQrData } from "./view.d";

const URLView = ({ qrData }: { qrData: URLQrData }) => {
	if (!qrData.url) {
		// Handle the case where the URL is missing
		return <p>URL not found</p>;
	}

	// Redirect to the URL using useEffect to avoid side effects during render
	useEffect(() => {
		window.location.href = qrData.url;
	}, [qrData.url]);

	// Optionally show a loading indicator or message while redirecting
	return <div>Redirecting to the URL...</div>;
};

export default URLView;
