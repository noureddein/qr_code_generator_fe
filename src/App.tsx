import Container from "@components/Container";
import useAPIs, { IdentityResponse } from "@hooks/useAPIs";
import useAuth from "@store/authStore";
import { useQuery } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect } from "react";
import { routeTree } from "./routeTree.gen";
import VConsole from "vconsole";

export const router = createRouter({
	routeTree,
	context: { apis: undefined!, accessToken: undefined! },
	defaultNotFoundComponent: () => {
		return <Container>404 Sorry, Page not found.</Container>;
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const apis = useAPIs();
	const auth = useAuth((s) => s.accessToken);
	const onSetUser = useAuth((s) => s.onSetUser);

	const { data } = useQuery<
		IdentityResponse,
		AxiosError,
		IdentityResponse,
		[string]
	>({
		queryFn: apis.identity,
		queryKey: ["identity"],
		enabled: !!auth,
	});

	useLayoutEffect(() => {
		if (data) {
			onSetUser(data.user);
		}
	}, [data?.user]);

	useEffect(() => {
		// Initialize vConsole (only in development or on mobile)
		// if (process.env.NODE_ENV === "development") {
		const vConsole = new VConsole();
		// console.log("vConsole is active!");
		// }
	}, []);

	return (
		<RouterProvider router={router} context={{ apis, accessToken: auth }} />
	);
}

export default App;
