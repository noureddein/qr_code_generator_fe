import Header from "@components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navigation from "../components/Navigation";
import Container from "@components/Container";

export const Route = createFileRoute("/_wrapper")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-green-600">
			<Header />
			<Navigation />
			<Container>
				<Outlet />
			</Container>
		</div>
	);
}
