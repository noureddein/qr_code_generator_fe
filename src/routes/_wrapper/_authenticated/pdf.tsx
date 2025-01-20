import FormContainer from "@components/FormContainer";
import PDFForm from "@components/forms/PDFForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_wrapper/_authenticated/pdf")({
	component: RouteComponent,
});
function RouteComponent() {
	return (
		<FormContainer>
			<PDFForm />
		</FormContainer>
	);
}
