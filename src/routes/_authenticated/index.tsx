import Container from "@components/Container";
import FormContainer from "@components/FormContainer";
import URLForm from "@components/forms/URLForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Container>
			<FormContainer>
				<URLForm />
			</FormContainer>
		</Container>
	);
}
