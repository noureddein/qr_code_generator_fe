import { User } from "@src/types.d";
import { create } from "zustand";
import {
	persist,
	// createJSONStorage
} from "zustand/middleware";
interface StoreState {
	user: User | null; // Replace `User` with your user type
	accessToken: string | null;

	onSetUser: (user: User | null) => void;
	onSetAccessToken: (accessToken: string | null) => void;
	onSetAuth: (user: User | null, accessToken: string | null) => void;
}

// const useAuth = create<StoreState>((set) => ({
// 	user: null,
// 	accessToken: null,
// 	onSetUser: (user) =>
// 		set(() => ({
// 			user,
// 		})),
// 	onSetAccessToken: (accessToken) =>
// 		set(() => ({
// 			accessToken,
// 		})),
// 	onSetAuth: (user, accessToken) =>
// 		set(() => ({
// 			accessToken,
// 			user,
// 		})),
// }));

const useAuth = create<StoreState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			onSetUser: (user) => set(() => ({ user })),
			onSetAccessToken: (accessToken) =>
				set((state) => ({ ...state, accessToken })),
			onSetAuth: (user, accessToken) =>
				set(() => ({
					user,
					accessToken,
				})),
		}),
		{
			name: "auth-storage", // Name of the storage key
			// storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
		}
	)
);

export default useAuth;
