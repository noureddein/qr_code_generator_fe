import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Navigation from "../components/Navigation";
import Header from "@components/Header";
import { UseAPIs } from "@hooks/useAPIs";

type RouterContext = {
	apis: UseAPIs;
	accessToken: string | null;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<React.Fragment>
			<Header />
			<Navigation />
			<Outlet />
		</React.Fragment>
	);
}
