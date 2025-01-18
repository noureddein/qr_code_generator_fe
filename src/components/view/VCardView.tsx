import { downloadVcfFile } from "@lib/helpers";
import { Button } from "flowbite-react/components/Button";
import { FaFax, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbBriefcase2Filled } from "react-icons/tb";
import { VCardQrData } from "./view.d";
import { twMerge } from "tailwind-merge";

interface VCardProps {
	qrData: VCardQrData;
}

const VCardView = ({ qrData }: VCardProps) => {
	const {
		firstName,
		lastName,
		position,
		email,
		phoneMobile,
		phoneWork,
		organization,
		website,
		street,
		city,
		state,
		zipcode,
		country,
		fax,
		text,
		imageBase64,
		// name,
	} = qrData;

	return (
		<div className=" h-dvh">
			<div className="relative pt-12 bg-gradient-to-r from-cyan-500 to-blue-500">
				<div className="w-full mx-auto shadow-2xl md:w-2/3 lg:w-1/3">
					<div className="flex flex-col items-center gap-4 p-2 py-8">
						<div
							className={twMerge(
								"w-40 h-40 overflow-hidden rounded-full ",
								!!imageBase64
									? "bg-transparent"
									: "bg-slate-600"
							)}
						>
							{!!imageBase64 && (
								<img src={imageBase64} alt="logo" />
							)}
						</div>
						<p className="m-0 text-white text-md">{`${firstName} ${lastName}`}</p>
						<p className="m-0 text-sm font-light text-white">{`${position}`}</p>
					</div>
					<div className="grid grid-cols-2 overflow-hidden font-mono text-sm border-t divide-x border-gray-200/50 dark:divide-slate-700">
						<a
							href={`tel:${phoneMobile}`}
							className="flex flex-col items-center gap-1 py-2 text-slate-400 hover:bg-gray-300/20"
						>
							<FaPhone className="text-2xl text-white" />
							<span className="text-[12px] font-light text-white uppercase">
								mobile
							</span>
						</a>
						<a
							href={`mailto:${email}`}
							target="_newEmail"
							className="flex flex-col items-center gap-1 py-2 text-sm text-slate-400 hover:bg-gray-300/20"
						>
							<MdEmail className="text-2xl text-white" />
							<span className="text-[12px] font-light text-white uppercase">
								email
							</span>
						</a>
					</div>
				</div>
			</div>

			<div className="w-full px-4 py-8 mx-auto bg-white shadow-2xl md:w-2/3 lg:w-1/3">
				{!!phoneWork && (
					<div className="grid items-center grid-cols-4 gap-4 py-4 ">
						<div className="">
							<div className="flex justify-end">
								<FaPhone className="text-3xl text-gray-400" />
							</div>
						</div>
						<div className="col-span-3 pb-2 border-b">
							<div className="flex flex-col gap-1">
								<a href={`tel:${phoneWork}`}>{phoneWork}</a>
								<small className="text-[12px] text-gray-500">
									Work phone
								</small>
							</div>
						</div>
					</div>
				)}

				{!!email && (
					<div className="grid items-center grid-cols-4 gap-4 py-4">
						<div className="">
							<div className="flex justify-end">
								<MdEmail className="text-3xl text-gray-400" />
							</div>
						</div>
						<div className="col-span-3">
							<div className="flex flex-col ">
								<a href={`mailto:${email}`} target="_newEmail">
									{email}
								</a>
								<small className="text-[12px] text-gray-500">
									Email
								</small>
							</div>
						</div>
					</div>
				)}

				{!!organization && (
					<div className="grid items-center grid-cols-4 gap-4 py-4">
						<div className="">
							<div className="flex justify-end">
								<TbBriefcase2Filled className="text-3xl text-gray-400" />
							</div>
						</div>
						<div className="col-span-3">
							<div className="flex flex-col ">
								<p>{organization}</p>
								<small className="text-[12px] text-gray-500">
									{position}
								</small>
							</div>
						</div>
					</div>
				)}

				{!!website && (
					<div className="grid items-center grid-cols-4 gap-4 py-4">
						<div className="">
							<div className="flex justify-end">
								<FaGlobe className="text-3xl text-gray-400" />
							</div>
						</div>
						<div className="col-span-3">
							<div className="flex flex-col ">
								<a href={website} target="_blank">
									{website}
								</a>
								<small className="text-[12px] text-gray-500">
									Website
								</small>
							</div>
						</div>
					</div>
				)}

				{(street || city || state || zipcode || country) && (
					<div className="grid items-center grid-cols-4 gap-4 py-4">
						<div className="">
							<div className="flex justify-end">
								<FaMapMarkerAlt className="text-3xl text-gray-400" />
							</div>
						</div>
						<div className="col-span-3">
							<div className="flex flex-col ">
								<p>{street}</p>
								<p>
									{city}, {state} {zipcode}
								</p>
								<p>{country}</p>

								<small className="text-[12px] text-gray-500">
									Address
								</small>
							</div>
						</div>
					</div>
				)}

				{!!fax && (
					<div className="grid items-center grid-cols-4 gap-4 py-4">
						<div className="">
							<div className="flex justify-end">
								<FaFax className="text-3xl text-gray-400" />
							</div>
						</div>
						<div className="col-span-3">
							<div className="flex flex-col ">
								<p>{fax}</p>
								<small className="text-[12px] text-gray-500">
									Fax
								</small>
							</div>
						</div>
					</div>
				)}

				<div className="col-span-4">
					<Button
						className="absolute flex items-start justify-center uppercase rounded-full top-4 right-4 w-14 h-14 sm:hidden"
						onClick={() =>
							downloadVcfFile(
								text,
								`vcard_${firstName}_${lastName}.vcf`
							)
						}
					>
						<IoMdPersonAdd className="p-0 size-7" />
					</Button>
					<Button
						className="hidden w-full uppercase sm:flex"
						onClick={() =>
							downloadVcfFile(
								text,
								`vcard_${firstName}_${lastName}.vcf`
							)
						}
					>
						<IoMdPersonAdd className="w-5 h-5 mr-2" /> Download
						VCARD
					</Button>
				</div>
			</div>
		</div>
	);
};

export default VCardView;
