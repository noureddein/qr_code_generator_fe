import { createFileRoute } from "@tanstack/react-router";
import Container from "@components/Container";
import EmailForm from "@components/forms/EmailForm";

export const Route = createFileRoute("/_authenticated/email")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Container>
			<EmailForm />
		</Container>
	);
}
