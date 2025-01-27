import { UseAPIs } from "@hooks/useAPIs";
import useAuth from "@store/authStore";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import * as React from "react";

type RouterContext = {
	apis: UseAPIs;
	accessToken: string | null;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	notFoundComponent: () => <p>404, Not found page.</p>,
});

const TanStackRouterDevtools =
	import.meta.env.VITE_NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				}))
			);

// console.log({ ENV: import.meta.env.VITE_NODE_ENV });

function RootComponent() {
	const user = useAuth((s) => s.user);
	const accessToken = useAuth((s) => s.accessToken);

	console.log({ user, accessToken });
	return (
		<React.Fragment>
			<Outlet />
			<TanStackRouterDevtools />
		</React.Fragment>
	);
}
