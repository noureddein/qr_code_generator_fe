import { QrDesign } from "@hooks/useHandleQRDesign";
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
	PDF = "pdf",
}

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
}
export interface PDFResponse {
	_id: string;
	userId: string;
	qrData: PDFQRData;
	qrDesign: QrDesign;
	type: string;
	image: string;
	nanoId: string;
	publicLink: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}
export interface PDFQRData {
	id?: string;
	name: string;
	text: string;
}
