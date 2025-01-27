import LoginForm from "@components/forms/LoginForm";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_wrapper/login")({
	component: RouteComponent,
	beforeLoad: async ({ context: { apis } }) => {
		try {
			const response = await apis.identity();
			console.log(response);
			if (response.isLoggedIn) {
				throw redirect({ to: "/url" });
			}
		} catch (error) {
			console.log(error);
		}
	},
});

function RouteComponent() {
	return <LoginForm />;
}
