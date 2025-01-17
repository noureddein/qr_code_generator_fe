import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_wrapper/_authenticated")({
	beforeLoad: async ({ context: { apis } }) => {
		const response = await apis.identity();
		if (!response.isLoggedIn) {
			throw redirect({ to: "/login" });
		}
	},
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
	notFoundComponent: () => {
		return <p>Desired page not found</p>;
	},
});
