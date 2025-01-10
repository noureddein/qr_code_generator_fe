import { vCardFormDataTypes } from "@validation/qrCodeOptions";
import vCardsJS from "vcards-js";

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

export const createVCard = (vCardData: vCardFormDataTypes) => {
	const vCard = vCardsJS();

	vCard.firstName = vCardData.firstName;
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

	return vCard.getFormattedString();
};

export const formatDate = (date: Date) => {
	try {
		const parsedDate = new Date(date);
		return new Intl.DateTimeFormat("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
			// hour: "2-digit",
			// minute: "2-digit",
			// hourCycle: "h12", // 24-hour format
		}).format(parsedDate);
	} catch (error) {
		console.log(error);
		return "";
	}
};
