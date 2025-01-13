import { downloadPNG, formatDate } from "@lib/helpers";
import {
	ActiveIcon,
	DeactivateIcon,
	DeleteIcon,
	EditIcon,
	PaintIcon,
} from "./Icons";
import DeleteModal from "./modals/DeleteModal";
import { ResponseRow } from "@src/routes/_wrapper/_authenticated/my-codes";
import EditQRCodeModal from "./modals/EditQRCodeModal";
import useUpdateActivation from "@hooks/useUpdateActivation";
import { Spinner } from "flowbite-react/components/Spinner";
import { MdAlternateEmail } from "react-icons/md";
import { CiText } from "react-icons/ci";
import { QRCodeTypes } from "@src/types.d";
import { IoIosLink } from "react-icons/io";
import { BsPersonVcard } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Tooltip } from "flowbite-react";
import EditQRDesignModal from "./modals/EditQRDesignModal";
interface QRCodeDetailsProps {
	row: ResponseRow;
}

const QRCodeDetails = ({ row }: QRCodeDetailsProps) => {
	const {
		_id,
		image,
		publicLink,
		type,
		createdAt,
		updatedAt,
		isActive,
		qrData,
	} = row;

	return (
		<div className="flex flex-col items-center justify-between p-3 bg-white border border-gray-200 rounded-[3px] md:flex-row md:max-w-full hover:border hover:border-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
			<div className="flex flex-col justify-between leading-normal ps-3">
				<Type type={type as QRCodeTypes} />
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize dark:text-white">
					{qrData.name}
				</h5>
				<p className="mb-1 text-sm font-normal text-gray-400 hover:underline">
					<a
						href={publicLink}
						target="_blank"
						className="flex items-center gap-1"
					>
						<IoIosLink />
						{publicLink}
					</a>
				</p>
			</div>

			<div className="flex flex-col justify-between leading-normal ps-3">
				<table>
					<tbody>
						<tr className="text-sm text-gray-400">
							<td className="">
								<MdAccessTime />
							</td>
							<td className="">Created At:</td>
							<td>{formatDate(createdAt)}</td>
						</tr>
						<tr className="text-sm text-gray-400">
							<td className="">
								<RxUpdate />
							</td>
							<td>Last update:</td>
							<td>{formatDate(updatedAt)}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="flex flex-row items-center gap-8">
				<img
					className="object-cover w-full h-48 rounded-t-lg md:h-auto md:w-32 md:rounded-none md:rounded-s-lg"
					src={image}
					alt=""
				/>
				<div className="flex flex-col gap-4">
					<button
						type="button"
						className="focus:outline-none border border-green-400 hover:text-white bg-inherit hover:bg-green-600 text-green-700  font-medium rounded-[2px] text-sm px-5 py-2.5  mb-2"
						onClick={() => downloadPNG(image, qrData.name)}
					>
						Download PNG
					</button>

					<div className="flex items-center justify-between px-2">
						<EditQRDesignModal
							id={_id}
							childrenButton={(onOpen) => (
								<Tooltip
									content="Design QR Code"
									placement="bottom"
								>
									<span onClick={onOpen}>
										<PaintIcon />
									</span>
								</Tooltip>
							)}
						/>
						<EditQRCodeModal
							id={_id}
							childrenButton={(onOpen) => (
								<Tooltip
									content="Edit content"
									placement="bottom"
								>
									<span onClick={onOpen}>
										<EditIcon />
									</span>
								</Tooltip>
							)}
						/>
						<Status id={row._id} isActive={isActive} />
						<DeleteModal
							id={_id}
							qrName={qrData.name}
							childrenButton={(onOpen) => (
								<Tooltip content="Delete" placement="bottom">
									<span onClick={onOpen}>
										<DeleteIcon />
									</span>
								</Tooltip>
							)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QRCodeDetails;

const Status = ({ id, isActive }: { id: string; isActive: boolean }) => {
	const { mutate, isPending } = useUpdateActivation({ id });

	if (isPending) {
		return <Spinner color="success" />;
	}

	return isActive ? (
		<Tooltip content="Deactivate" placement="bottom">
			<DeactivateIcon onClick={() => mutate()} />
		</Tooltip>
	) : (
		<Tooltip content="Activate" placement="bottom">
			<ActiveIcon onClick={() => mutate()} />
		</Tooltip>
	);
};

const Type = ({ type }: { type: QRCodeTypes }) => {
	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<p className="flex items-baseline gap-1 mb-1 text-sm font-normal text-gray-400 uppercase">
			{children} {type}
		</p>
	);

	switch (type) {
		case QRCodeTypes.EMAIL:
			return (
				<Wrapper>
					<MdAlternateEmail />
				</Wrapper>
			);

		case QRCodeTypes.TEXT:
			return (
				<Wrapper>
					<CiText />
				</Wrapper>
			);

		case QRCodeTypes.URL:
			return (
				<Wrapper>
					<IoIosLink />
				</Wrapper>
			);

		case QRCodeTypes.VCARD:
			return (
				<Wrapper>
					<BsPersonVcard />
				</Wrapper>
			);

		default:
			return <Wrapper>{type}</Wrapper>;
	}
};
