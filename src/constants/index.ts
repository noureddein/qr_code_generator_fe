import { QRCodeTypes } from "@src/types.d";

export const defaultQROpts = {
	colorLight: "#ffffff",
	colorDark: "#000000",
	quietZone: 20,
	quietZoneColor: "#ffffff",
	size: 1000,
};

export const Status = {
	ACTIVE: true,
	IN_ACTIVE: false,
};

export enum Sort {
	LAST_CREATED = "last_created",
	NAME_ASC = "name_asc",
	NAME_DESC = "name_desc",
}

export const SORT_LABEL = {
	[Sort.LAST_CREATED]: "Last Created",
	[Sort.NAME_ASC]: "Name (A-Z)",
	[Sort.NAME_DESC]: "Name (Z-A)",
};

export const FILTER_LABEL = {
	all: "All",
	[QRCodeTypes.EMAIL]: "Email",
	[QRCodeTypes.TEXT]: "Text",
	[QRCodeTypes.URL]: "URL",
	[QRCodeTypes.VCARD]: "vCard",
};
