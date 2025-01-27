import useAPIs from "@hooks/useAPIs";
import useAuth from "@store/authStore";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Spinner } from "flowbite-react/components/Spinner";
import Container from "./Container";
import CustomLink from "./CustomLink";
import toast from "react-hot-toast";

const Header = () => {
	return (
		<header className="sticky top-0 left-0 right-0 z-30 bg-green-700 shadow-lg">
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
	const { logout } = useAPIs();
	const user = useAuth((s) => s.user);
	const onSetAuth = useAuth((s) => s.onSetAuth);
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: logout,
		onSuccess: async () => {
			onSetAuth(null, null);
			// window.location.href = "/login";
			await navigate({ to: "/login" });
		},
		onError: (err) => {
			console.log(err);
			toast.error("Failed to logout!");
		},
	});

	return (
		<>
			{user && (
				<div className="flex gap-x-5">
					<CustomLink
						path="/my-codes"
						tabName="My QR Codes"
						className="text-md "
					/>
					<CustomLink
						path="/profile"
						tabName="Profile"
						className="text-md "
					/>
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
							className="px-4 py-2 font-normal text-white rounded-md cursor-pointer bg-emerald-800 text-md hover:text-gray-200"
						>
							Register
						</Link>
					</>
				) : (
					<button
						disabled={isPending}
						onClick={() => mutate()}
						type="submit"
						className="text-white bg-emerald-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center  disabled:bg-gray-500 disabled:cursor-not-allowed"
					>
						{isPending ? <Spinner color="gray" /> : "Logout"}
					</button>
				)}
			</div>
		</>
	);
};

export default Header;
