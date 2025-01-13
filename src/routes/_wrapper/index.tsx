import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_wrapper/")({
	component: Index,
	beforeLoad: async ({ context: { apis } }) => {
		const response = await apis.identity();
		if (response.isLoggedIn) {
			throw redirect({ to: "/url" });
		}
	},
});

function Index() {
	return <div>Index Page</div>;
}
