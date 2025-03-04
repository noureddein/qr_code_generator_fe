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
import { Tooltip } from "flowbite-react/components/Tooltip";
import EditQRDesignModal from "./modals/EditQRDesignModal";
import QRCodeZoom from "./modals/QRCodeZoom";
import { Checkbox } from "flowbite-react/components/Checkbox";
import useBulkUpdate from "@store/bulkUpdate";
import { Status as StatusType } from "@src/constants";
import { FaRegFilePdf } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { IoIosArrowRoundForward } from "react-icons/io";

interface QRCodeDetailsProps {
	row: ResponseRow;
}

const QRCodeDetails = ({ row }: QRCodeDetailsProps) => {
	const onSelect = useBulkUpdate((s) => s.onSelect);
	const selectedIds = useBulkUpdate((s) => s.ids);

	const {
		_id,
		image,
		publicLink,
		type,
		createdAt,
		updatedAt,
		isActive,
		qrData,
		scanCount,
	} = row;

	return (
		<>
			<div className=" relative grid grid-cols-12 gap-4 bg-white border border-gray-200 rounded-[3px] ps-8 p-4 content-center hover:border hover:border-gray-700 group/delete-box ">
				<div className="absolute flex items-center justify-center h-full px-1 group-hover/delete-box:flex">
					<Checkbox
						color="green"
						onChange={() => onSelect(_id)}
						checked={selectedIds.includes(_id)}
					/>
				</div>

				<div className="col-span-12 leading-normal md:col-span-6 lg:col-span-3">
					<div className="flex flex-col h-full justify-evenly">
						<Type type={type as QRCodeTypes} />
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize break-all dark:text-white">
							{qrData.name}
						</h5>
						<p className="mb-1 text-[11px] font-normal text-gray-400 hover:underline">
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
				</div>

				<div className="col-span-12 leading-normal md:col-span-6 lg:col-span-3 ps-3">
					<div className="flex flex-col items-start justify-center h-full md:items-center">
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
				</div>

				<div className="w-full col-span-12 md:col-span-6 lg:col-span-2">
					<QRCodeZoom image={image} />
				</div>

				<div className="lg:col-span-2">
					<div className="flex flex-col h-full justify-evenly">
						<div className="mx-auto">
							<div className="w-full">
								<p className="m-0 text-2xl font-semibold text-green-400">
									{scanCount}
								</p>
								<small className="text-gray-400">scans</small>
							</div>

							<Link href="/" className="text-sm underline">
								<div className="flex items-center gap-1">
									Details
									<IoIosArrowRoundForward className=" size-6" />
								</div>
							</Link>
						</div>
					</div>
				</div>

				<div className="col-span-12 md:col-span-6 lg:col-span-2">
					<div className="flex flex-col justify-center h-full">
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
								id={[_id]}
								qrName={qrData.name}
								childrenButton={(onOpen) => (
									<Tooltip
										content="Delete"
										placement="bottom"
									>
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
		</>
	);
};

export default QRCodeDetails;

const Status = ({ id, isActive }: { id: string; isActive: boolean }) => {
	const { mutate, isPending } = useUpdateActivation();

	if (isPending) {
		return <Spinner color="success" />;
	}

	return isActive ? (
		<Tooltip content="Deactivate" placement="bottom">
			<DeactivateIcon
				onClick={() =>
					mutate({ ids: [id], status: StatusType.IN_ACTIVE })
				}
			/>
		</Tooltip>
	) : (
		<Tooltip content="Activate" placement="bottom">
			<ActiveIcon
				onClick={() => mutate({ ids: [id], status: StatusType.ACTIVE })}
			/>
		</Tooltip>
	);
};

const Type = ({ type }: { type: QRCodeTypes }) => {
	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<p className="flex items-baseline gap-1 mb-1 text-[11px] font-normal text-gray-400 uppercase">
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

		case QRCodeTypes.PDF:
			return (
				<Wrapper>
					<FaRegFilePdf />
				</Wrapper>
			);

		default:
			return <Wrapper>{type}</Wrapper>;
	}
};
