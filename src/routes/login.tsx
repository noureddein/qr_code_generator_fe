import Container from "@components/Container";
import LoginForm from "@components/forms/LoginForm";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	beforeLoad: async ({ context: { apis } }) => {
		const response = await apis.identity();
		if (response.isLoggedIn) {
			throw redirect({ to: "/" });
		}
	},
});

function RouteComponent() {
	return (
		<Container>
			<LoginForm />
		</Container>
	);
}
