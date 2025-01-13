import VCardView from "@components/view/VCardView";
import { server } from "@lib/server";
import { QRCodeTypes } from "@src/types.d";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/$id")({
	component: RouteComponent,
	loader: async ({ params: { id }, abortController }) => {
		try {
			const URL = `/api/public/qr-codes/${id}`;
			const result = await server.get(URL, {
				signal: abortController.signal,
			});

			return result.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return { error: true, message: error.response?.data.message };
			}
			return { error: true };
		}
	},
	pendingComponent: () => <p>Loading.....</p>,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	if (data.error) {
		return <p>{data?.message || "Unexpected error."}</p>;
	}

	switch (data.row.type) {
		case QRCodeTypes.VCARD:
			return <VCardView qrData={data.row.qrData} />;

		case QRCodeTypes.URL:
			return <p>is URL</p>;

		default:
			break;
	}
}
