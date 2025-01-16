import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormDataTypes } from "@validation/index";
import { useMutation } from "@tanstack/react-query";
import { server } from "@lib/server";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, User } from "@src/types.d";
import { Spinner } from "flowbite-react/components/Spinner";
import useAuth from "@store/authStore";
import Input from "@components/Input";

export interface Response {
	message: string;
	user: User;
	accessToken: string;
}

const RegisterForm = () => {
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
		<div className="flex flex-col items-center w-full p-6 mx-auto align-middle bg-gray-200 rounded-md opacity-1 drop-shadow-md">
			<h3 className="mb-3 text-5xl font-medium text-gray-900">
				Register
			</h3>
			<form
				className="w-full h-full sm:w-full lg:w-1/3"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-3">
					<Input
						errors={errors}
						id="firstName"
						register={register}
						label="First name"
						inputProps={{
							placeholder: "First Name",
						}}
					/>

					<Input
						errors={errors}
						id="lastName"
						register={register}
						label="Last name"
						inputProps={{
							placeholder: "Last Name",
						}}
					/>

					<Input
						errors={errors}
						id="username"
						register={register}
						label="Username"
						inputProps={{
							placeholder: "Username",
						}}
					/>

					<Input
						errors={errors}
						id="email"
						register={register}
						label="Your email"
						type="email"
						inputProps={{
							placeholder: "Your email",
						}}
					/>

					<Input
						errors={errors}
						id="password"
						type="password"
						register={register}
						label="Password"
						inputProps={{
							placeholder: "*******",
						}}
					/>

					<Input
						errors={errors}
						id="confirmPassword"
						type="password"
						register={register}
						label="Confirm Password"
						inputProps={{
							placeholder: "*******",
						}}
					/>

					<button
						disabled={isPending}
						type="submit"
						className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
					>
						{isPending ? <Spinner color="gray" /> : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
