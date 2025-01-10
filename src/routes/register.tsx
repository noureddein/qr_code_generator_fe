import Container from "@components/Container";
import RegisterForm from "@components/forms/RegisterForm";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
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
			<RegisterForm />
		</Container>
	);
}
