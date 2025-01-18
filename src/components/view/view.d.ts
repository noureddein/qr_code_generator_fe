export interface VCardProps {
	qrData: VCardQrData;
	type: string;
	image: string;
	nanoId: string;
	publicLink: string;
	isActive: boolean;
}

export interface VCardQrData {
	text: string;
	name: string;
	firstName: string;
	lastName: string;
	organization: string;
	position: string;
	phoneWork: string;
	phoneMobile: string;
	fax: string;
	email: string;
	website: string;
	street: string;
	zipcode: string;
	city: string;
	state: string;
	country: string;
	imageBase64: string;
}

export interface URLProps {
	_id: string;
	userId: string;
	qrData: URLQrData;
	qrDesign: QrDesign;
	type: string;
	image: string;
	nanoId: string;
	publicLink: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface URLQrData {
	url: string;
	name: string;
	text: string;
}
