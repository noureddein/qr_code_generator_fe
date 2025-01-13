import Header from "@components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navigation from "../components/Navigation";
import Container from "@components/Container";

export const Route = createFileRoute("/_wrapper")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="bg-green-500 h-dvh">
			<Header />
			<Navigation />
			<Container>
				<Outlet />
			</Container>
		</div>
	);
}
