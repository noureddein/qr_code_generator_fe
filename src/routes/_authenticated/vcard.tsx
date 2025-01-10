import Container from "@components/Container";
import FormContainer from "@components/FormContainer";
import VCardForm from "@components/forms/VCardForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/vcard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Container>
			<FormContainer>
				<VCardForm />
			</FormContainer>
		</Container>
	);
}
