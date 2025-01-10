import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormDataTypes } from "@validation/index";
import { useMutation } from "@tanstack/react-query";
import { server } from "@lib/server";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, User } from "@src/types.d";
import { Spinner } from "flowbite-react/components/Spinner";
// import { useAccessToken } from "@providers/AuthProvider";
// import { redirect } from "@tanstack/react-router";
import useAuth from "@store/authStore";

export interface Response {
	message: string;
	user: User;
	accessToken: string;
}

const RegisterForm = () => {
	// const { onSetAuth } = useAccessToken();
	const onSetAuth = useAuth((s) => s.onSetAuth);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegisterFormDataTypes>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "nour@gmail.com",
			firstName: "nour eddein",
			lastName: "al abbassi",
			confirmPassword: "12345678",
			password: "12345678",
			username: "noureddein",
		},
	});

	const { mutate, isPending } = useMutation<
		AxiosResponse,
		AxiosError,
		RegisterFormDataTypes
	>({
		mutationFn: async (
			data: RegisterFormDataTypes
		): Promise<AxiosResponse<Response>> => {
			try {
				const URL = "/api/user/register";
				const res: AxiosResponse<Response> = await server.post(
					URL,
					data,
					{
						withCredentials: true,
					}
				);
				onSetAuth(res.data.user, res.data.accessToken);
				window.location.reload();
				return res;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		onError: (err: AxiosError) => {
			const errStatus = err.response?.status as number;
			const responseData = err.response?.data as ErrorResponse;
			if (errStatus >= 409) {
				responseData.errors.forEach((err: any) => {
					setError(err.path, { message: err.msg });
				});
			}
		},
	});

	const onSubmit = (data: RegisterFormDataTypes) => {
		mutate(data);
	};

	return (
		<div className="flex justify-center w-full p-6 mx-auto align-middle bg-gray-200 rounded-md opacity-1 drop-shadow-md">
			<form
				className="w-full h-full sm:w-full lg:w-1/3"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						First name
					</label>
					<input
						type="text"
						id="firstName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						placeholder="First name"
						{...register("firstName", { required: true })}
					/>
					{errors.firstName && (
						<span className="text-sm text-red-500 ps-2">
							{errors.firstName.message}
						</span>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Last name
					</label>
					<input
						type="text"
						id="lastName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						placeholder="Last name"
						{...register("lastName", { required: true })}
					/>
					{errors.lastName && (
						<span className="text-sm text-red-500 ps-2">
							{errors.lastName.message}
						</span>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						placeholder="Username"
						{...register("username", { required: true })}
					/>
					{errors.username && (
						<span className="text-sm text-red-500 ps-2">
							{errors.username.message}
						</span>
					)}
				</div>
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
				<div className="mb-5">
					<label
						htmlFor="confirmPassword"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Confirm password
					</label>
					<input
						type="password"
						id="confirmPassword"
						placeholder="Confirm confirmPassword"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
						{...register("confirmPassword", { required: true })}
					/>
					{errors.confirmPassword && (
						<span className="text-sm text-red-500 ps-2">
							{errors.confirmPassword.message}
						</span>
					)}
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

export default RegisterForm;
