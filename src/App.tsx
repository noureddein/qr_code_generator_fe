import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import useAPIs from "@hooks/useAPIs";
import useAuth from "@store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import Container from "@components/Container";

const router = createRouter({
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

	const { data } = useQuery({
		queryFn: apis.identity,
		queryKey: ["identity"],
		enabled: !!auth,
	});
	useLayoutEffect(() => {
		if (data) {
			onSetUser(data.user);
		}
	}, [data?.user]);
	return (
		<RouterProvider router={router} context={{ apis, accessToken: auth }} />
	);
}

export default App;
