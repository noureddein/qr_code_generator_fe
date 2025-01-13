// import { useAccessToken } from "@providers/AuthProvider";
import Container from "./Container";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react/components/Spinner";
import useAPIs from "@hooks/useAPIs";
import useAuth from "@store/authStore";

const Header = () => {
	return (
		<header>
			<Container>
				<div className="flex items-center justify-between">
					<Link to="/url">
						<h1 className="text-4xl font-medium text-white ">
							QR Code
						</h1>
					</Link>
					<AuthButtons />
				</div>
			</Container>
		</header>
	);
};

const AuthButtons = () => {
	// const { auth, isLoading } = useAccessToken();
	const { logout } = useAPIs();
	const navigate = useNavigate();
	const user = useAuth((s) => s.user);

	const { mutate, isPending } = useMutation({
		mutationFn: logout,
		onSuccess: async () => {
			// window.location.reload();
			await navigate({ to: "/login" });
		},
		onError: (err) => {
			console.log(err);
		},
	});
	// if (!user) {
	// 	return (
	// 		<div role="status" className="max-w-sm animate-pulse">
	// 			<div className="w-48 h-5 bg-green-200 rounded-full dark:bg-gray-700"></div>
	// 		</div>
	// 	);
	// }
	return (
		<>
			{user && (
				<div className="flex gap-3">
					<Link
						to="/my-codes"
						className="font-normal text-white cursor-pointer text-md"
						activeProps={{
							className:
								"font-bold text-white text-white relative after:absolute after:inset-x-0 after:-bottom-3 after:h-[2px] after:bg-slate-200",
						}}
					>
						My QR Codes
					</Link>

					<Link
						to="/profile"
						className="font-normal text-white cursor-pointer text-md"
						activeProps={{
							className:
								"font-bold text-white text-white relative after:absolute after:inset-x-0 after:-bottom-3 after:h-[2px] after:bg-slate-200",
						}}
					>
						Profile
					</Link>
				</div>
			)}
			<div className="flex items-center gap-4">
				{!user ? (
					<>
						<Link
							to="/login"
							className="font-normal text-white cursor-pointer text-md"
						>
							Login
						</Link>

						<Link
							to="/register"
							className="px-4 py-2 font-normal text-white bg-green-400 rounded-md cursor-pointer text-md hover:text-gray-200"
						>
							Register
						</Link>
					</>
				) : (
					<button
						disabled={isPending}
						onClick={() => mutate()}
						type="submit"
						className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
					>
						{isPending ? <Spinner color="gray" /> : "Logout"}
					</button>
				)}
			</div>
		</>
	);
};

export default Header;
