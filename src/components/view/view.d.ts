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
}
