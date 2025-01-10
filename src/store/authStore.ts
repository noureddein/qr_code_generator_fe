import { User } from "@src/types";
import { create } from "zustand";

interface StoreState {
	user: User | null; // Replace `User` with your user type
	accessToken: string | null;

	onSetUser: (user: User | null) => void;
	onSetAccessToken: (accessToken: string | null) => void;
	onSetAuth: (user: User | null, accessToken: string | null) => void;
}

const useAuth = create<StoreState>((set) => ({
	user: null,
	accessToken: null,
	onSetUser: (user) =>
		set(() => ({
			user,
		})),
	onSetAccessToken: (accessToken) =>
		set(() => ({
			accessToken,
		})),
	onSetAuth: (user, accessToken) =>
		set(() => ({
			accessToken,
			user,
		})),
}));

export default useAuth;
