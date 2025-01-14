import Container from "@components/Container";
import URLView from "@components/view/URLView";
import VCardView from "@components/view/VCardView";
import { server } from "@lib/server";
import { QRCodeTypes } from "@src/types.d";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import axios from "axios";
import { Spinner } from "flowbite-react/components/Spinner";

export const Route = createFileRoute("/$id")({
	component: RouteComponent,
	loader: async ({ params: { id }, abortController }) => {
		try {
			const URL = `/api/public/qr-codes/${id}`;

			// await new Promise((resolve) => setTimeout(resolve, 8000)); // Delay for 2 seconds

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
	pendingComponent: () => {
		return (
			<div className="flex items-center justify-center min-h-dvh bg-slate-400">
				<Container>
					<div className="flex items-center justify-center h-full ">
						<Spinner aria-label="Wait qr data" size="xl" />
					</div>
				</Container>
			</div>
		);
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();
	if (data.error) {
		return <p>{data?.message || "Unexpected error."}</p>;
	}

	return (
		<>
			<Render data={data} />
			<Outlet />
		</>
	);
}

const Render = ({ data }: { data: any }) => {
	switch (data.row.type) {
		case QRCodeTypes.VCARD:
			return <VCardView qrData={data.row.qrData} />;

		case QRCodeTypes.URL:
			return <URLView qrData={data.row.qrData} />;

		default:
			break;
	}
};
