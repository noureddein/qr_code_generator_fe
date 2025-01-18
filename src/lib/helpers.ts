import { vCardFormDataTypes } from "@validation/qrCodeOptions";
import vCardsJS from "vcards-js";
import { saveAs } from "file-saver";

export const downloadPNG = (
	data: string | undefined,
	filename: string = "qr_code"
) => {
	if (!data) return;
	const link = document.createElement("a");
	link.href = data;
	link.download = filename;
	link.click();
};

export const downloadVcfFile = (
	vcfText: BlobPart,
	filename: string = "vcard.vcf"
) => {
	const element = document.createElement("a");
	const file = new Blob([vcfText], { type: "text/vcard" });
	element.href = URL.createObjectURL(file);
	element.download = filename;
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

export const downloadVCF = (text: BlobPart, fileName: string) => {
	const file = new Blob([text], { type: "text/plain;charset=utf-8" });
	saveAs(file, fileName + ".vcf");
};

export const createVCard = (vCardData: vCardFormDataTypes) => {
	const vCard = vCardsJS();

	vCard.firstName = vCardData.firstName;
	if (vCardData.imageBase64 && vCardData.imageType) {
		vCard.photo.embedFromString(
			vCardData.imageBase64.split(",")[1],
			vCardData.imageType
		);
	}
	vCard.lastName = vCardData.lastName;
	vCard.organization = vCardData.organization;
	vCard.title = vCardData.position;
	vCard.workPhone = vCardData.phoneWork;
	vCard.cellPhone = vCardData.phoneMobile;
	vCard.workFax = vCardData.fax;
	vCard.email = vCardData?.email || "";
	vCard.url = vCardData?.website || "";
	vCard.workAddress.label = "Work Address";
	vCard.workAddress.street = vCardData.street;
	vCard.workAddress.postalCode = vCardData.zipcode;
	vCard.workAddress.city = vCardData.city;
	vCard.workAddress.stateProvince = vCardData.state;
	vCard.workAddress.countryRegion = vCardData.country;

	return vCard;
};

export const formatDate = (date: Date) => {
	try {
		const parsedDate = new Date(date);
		return new Intl.DateTimeFormat("en-US", {
			month: "short", // Short month name (e.g., Jan)
			day: "numeric", // Day of the month (e.g., 4)
			year: "numeric", // Full year (e.g., 2025)
			// day: "2-digit",
			// month: "2-digit",
			// year: "2-digit",
			// hour: "2-digit",
			// minute: "2-digit",
			// hourCycle: "h12", // 24-hour format
		}).format(parsedDate);
	} catch (error) {
		console.log(error);
		return "";
	}
};

// Helper function to get image dimensions
export const getImageDimensions = (
	file: File
): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () =>
				resolve({ width: img.width, height: img.height });
			img.onerror = reject;
			if (e.target?.result) {
				img.src = e.target.result as string;
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

export type vCardImageType = "image/png" | "image/jpg";

type fileToBase64Response = {
	base64: string;
	type: vCardImageType;
};

export const fileToBase64 = (file: File): Promise<fileToBase64Response> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			if (reader.result) {
				resolve({
					base64: reader.result as string,
					type: file.type as vCardImageType,
				});
			} else {
				reject({ base64: null, type: null });
			}
		};

		reader.onerror = (error) => {
			reject(error);
		};
	});
};
