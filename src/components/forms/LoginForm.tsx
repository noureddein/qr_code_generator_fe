import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react/components/Spinner";
import { AxiosError } from "axios";
import { ErrorResponse } from "src/types";
import { loginSchema, LoginFormDataTypes } from "@validation/index";
import useAPIs from "@hooks/useAPIs";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "@store/authStore";
import Input from "@components/Input";

const LoginForm = () => {
	const { login } = useAPIs();
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
			console.log({ result });
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
		<div className="flex flex-col items-center w-full p-6 mx-auto align-middle bg-gray-200 rounded-md drop-shadow-md">
			<h3 className="mb-3 text-5xl font-medium text-gray-900">Login</h3>
			<form
				className="w-full h-full sm:w-full lg:w-1/3 "
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-3">
					<Input
						errors={errors}
						id="email"
						type="email"
						register={register}
						label="Email"
						inputProps={{
							placeholder: "Your Email",
						}}
					/>

					<Input
						errors={errors}
						id="password"
						type="password"
						register={register}
						label="Password"
						inputProps={{
							placeholder: "********",
						}}
					/>

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
