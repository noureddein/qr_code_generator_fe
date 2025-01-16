export const defaultQROpts = {
	colorLight: "#ffffff",
	colorDark: "#000000",
	quietZone: 20,
	quietZoneColor: "#ffffff",
	size: 1000,
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
