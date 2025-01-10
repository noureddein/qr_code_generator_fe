import { AxiosResponse } from "axios";

export interface ErrorResponse {
	errors: { path: string; msg: string }[];
	message?: string;
}

export interface GenerateQRCodeResponse {
	image: string;
}

export enum QRCodeTypes {
	URL = "url",
	VCARD = "vcard",
	EMAIL = "email",
	TEXT = "text",
}

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
}
