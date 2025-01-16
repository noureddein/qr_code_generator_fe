import Input from "@components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import useSaveQrCode from "@hooks/useSaveQrCode";
import { createVCard } from "@lib/helpers";
import { vCardFormDataTypes, vCardSchema } from "@validation/qrCodeOptions";
import { Spinner } from "flowbite-react/components/Spinner";
import { useForm } from "react-hook-form";
import { ErrorResponse, QRCodeTypes } from "@src/types.d";
import useUpdateQRCode from "@hooks/useUpdateQRCode";
import toast from "react-hot-toast";

const VCardForm = ({ data }: { data?: vCardFormDataTypes }) => {
	const initialValues = data || {
		firstName: "Do Media",
		lastName: "",
		organization: "Do Media Agency",
		position: "Agency",
		phoneWork: "00962790078734",
		phoneMobile: "00962790078734",
		fax: "12344",
		email: "do@info.com",
		website: "https://www.domedia.me",
		street: "Doraa",
		zipcode: "11223",
		city: "Amman",
		state: "Amman Gov",
		country: "Jordan",
		name: "Do Media QR code",
	};

	const {
		mutate: saveQR,
		isPending: isSaving,
		isError,
		context,
	} = useSaveQrCode();

	const { mutate: updateQR, isPending: isUpdating } = useUpdateQRCode({
		URL: `/api/qr-codes/vcard`,
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setError,
		reset,
	} = useForm<vCardFormDataTypes>({
		resolver: zodResolver(vCardSchema),
		defaultValues: initialValues,
	});

	const onSave = async (data: vCardFormDataTypes) => {
		const vCard = createVCard(data);
		const dataToSave = {
			qrData: {
				text: vCard.getFormattedString(),
				...data,
			},
			type: QRCodeTypes.VCARD,
		};
		saveQR(dataToSave, {
			onSuccess: (res) => {
				toast.success(res.data.message);
				reset();
			},
			onError: (err) => {
				const errStatus = err.response?.status as number;
				const responseData = err.response?.data as ErrorResponse;
				if (errStatus >= 409) {
					responseData.errors.forEach((err: any) => {
						setError(err.path, { message: err.msg });
					});
				}
			},
		});
	};

	const onUpdate = async (data: vCardFormDataTypes) => {
		const vCard = createVCard(data);
		const text = vCard.getFormattedString();
		updateQR(
			{ data: { text, ...data } },
			{
				onSuccess: async (res) => {
					toast.success(res.message);
				},
				onError: (err) => {
					const errStatus = err.response?.status as number;
					const responseData = err.response?.data as ErrorResponse;
					if (errStatus >= 409 && errStatus < 500) {
						responseData.errors.forEach((err: any) => {
							setError(err.path, { message: err.msg });
						});
					} else {
						console.log(err);
						toast.error(
							responseData?.message || "Unexpected error"
						);
					}
				},
			}
		);
	};

	const onSubmit = (data: vCardFormDataTypes) => {
		if (initialValues.id) {
			onUpdate(data);
		} else {
			onSave(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex">
				<div className="flex-auto w-full p-4">
					<Input
						id="name"
						label="QR Code name"
						register={register}
						errors={errors}
						inputProps={{ placeholder: "Name" }}
						containerClass={{ className: "mb-3" }}
					/>

					<div className="flex flex-col gap-2">
						<Input
							id="firstName"
							label="First name"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Fist name",
							}}
						/>

						<Input
							id="lastName"
							label="Last name"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Last name",
							}}
						/>

						<Input
							id="organization"
							label="Organization"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Organization",
							}}
						/>

						<Input
							id="position"
							label="Position"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Position",
							}}
						/>

						<Input
							id="phoneWork"
							label="Phone (Work)"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Phone (Work)",
							}}
						/>

						<Input
							id="phoneMobile"
							label="Phone (Mobile)"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Phone (Mobile)",
							}}
						/>

						<Input
							id="fax"
							label="Fax"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Fax",
							}}
						/>

						<Input
							id="email"
							label="Email"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Email",
							}}
							type="email"
						/>

						<Input
							id="website"
							label="Website"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Website",
							}}
							type="url"
						/>

						<Input
							id="street"
							label="Street"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Street",
							}}
						/>

						<Input
							id="zipcode"
							label="Zip code"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Zip code",
							}}
						/>

						<Input
							id="city"
							label="City"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "City",
							}}
						/>

						<Input
							id="state"
							label="State"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "State",
							}}
						/>

						<Input
							id="country"
							label="Country"
							register={register}
							errors={errors}
							inputProps={{
								placeholder: "Country",
							}}
						/>
					</div>

					{isError && (
						<p className="my-4 text-red-600 ">{context?.error}</p>
					)}

					<div className="flex mt-4">
						<button
							disabled={!isValid || isSaving || isUpdating}
							type="submit"
							className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:hover:cursor-not-allowed me-0 ms-auto"
						>
							{isSaving || isUpdating ? (
								<Spinner color="gray" />
							) : (
								"Save"
							)}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default VCardForm;
