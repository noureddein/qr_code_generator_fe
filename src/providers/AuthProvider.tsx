import useAPIs from "@hooks/useAPIs";
import { User } from "@src/types.d";
import useAuth from "@store/authStore";
import { useQuery } from "@tanstack/react-query";
import React, {
	createContext,
	useContext,
	useLayoutEffect,
	useState,
} from "react";

interface AuthType {
	user: null | User;
	accessToken: null | string;
}

interface AuthContextProps {
	auth: AuthType;
	isLoading: boolean;
	onSetAuth: (auth: AuthType) => void;
	onSetNewToken: (token: string) => void;
}
const AuthContext = createContext<AuthContextProps>({
	auth: {
		user: null,
		accessToken: null,
	},
	isLoading: false,
	onSetAuth: () => {},
	onSetNewToken: () => {},
});

export const useAccessToken = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("useAuth context must be used within AuthProvider.");
	}

	return authContext;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { identity } = useAPIs();
	const [auth, setAuth] = useState<AuthType>({
		user: null,
		accessToken: null,
	});

	const onSetUser = useAuth((s) => s.onSetUser);

	const onSetAuth = ({ user, accessToken }: AuthType) =>
		setAuth((prev) => ({ ...prev, user, accessToken }));

	const onSetNewToken = () =>
		// newToken?: string
		{
			console.log("NEW SET");
			// setAuth((prev) => ({ ...prev, accessToken: newToken }));
		};

	const { data, isPending } = useQuery({
		queryFn: identity,
		queryKey: ["profile"],
		enabled: !!auth.accessToken,
	});

	console.log({ auth });

	useLayoutEffect(() => {
		if (data?.isLoggedIn && !auth.user) {
			onSetUser(data.user);
		}
	}, [data]);

	return (
		<AuthContext.Provider
			value={{ isLoading: isPending, auth, onSetAuth, onSetNewToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
