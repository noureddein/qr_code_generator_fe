import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react/components/Spinner";
import { AxiosError } from "axios";
import { ErrorResponse } from "src/types";
import { loginSchema, LoginFormDataTypes } from "@validation/index";
import useAPIs from "@hooks/useAPIs";
// import { useAccessToken } from "@providers/AuthProvider";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "@store/authStore";

const LoginForm = () => {
	const { login } = useAPIs();
	// const { onSetAuth } = useAccessToken();
	const navigate = useNavigate({ from: "/login" });
	const onSetAuth = useAuth((s) => s.onSetAuth);

	const { isPending, mutate } = useMutation({
		mutationFn: login,
		onError: (err: AxiosError) => {
			const errStatus = err.response?.status as number;
			const responseData = err.response?.data as ErrorResponse;
			if (errStatus >= 409) {
				responseData.errors.forEach((err: any) => {
					setError(err.path, { message: err.msg });
				});
			}
		},
		onSuccess: async (result) => {
			onSetAuth(result.accessToken, result.user);
			await navigate({ to: "/my-codes" });
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginFormDataTypes>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "nour@gmail.com",
			password: "12345678",
		},
	});

	const onSubmit = (data: LoginFormDataTypes) => mutate(data);

	return (
		<div className="flex justify-center w-full p-6 mx-auto align-middle bg-gray-200 rounded-md opacity-1 drop-shadow-md">
			<form
				className="w-full h-full sm:w-full lg:w-1/3 "
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your email
					</label>
					<input
						type="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						placeholder="name@flowbite.com"
						{...register("email", { required: true })}
					/>
					{errors.email && (
						<span className="text-sm text-red-500 ps-2">
							{errors.email.message}
						</span>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your password
					</label>
					<input
						type="password"
						id="password"
						placeholder="Password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						{...register("password", { required: true })}
					/>
					{errors.password && (
						<span className="text-sm text-red-500 ps-2">
							{errors.password.message}
						</span>
					)}
				</div>
				<div className="flex items-start mb-5">
					<div className="flex items-center h-5">
						<input
							id="remember"
							type="checkbox"
							value=""
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
						/>
					</div>
					<label
						htmlFor="remember"
						className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
					>
						Remember me
					</label>
				</div>
				<button
					disabled={isPending}
					type="submit"
					className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
				>
					{isPending ? <Spinner color="gray" /> : "Submit"}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
