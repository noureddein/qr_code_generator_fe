import { UseAPIs } from "@hooks/useAPIs";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import * as React from "react";

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
			<Outlet />
			<TanStackRouterDevtools />
		</React.Fragment>
	);
}
