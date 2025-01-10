import { z } from "zod";

// Shared Schema Components
const qrCodeOptions = z.object({
	colorDark: z.string(),
	colorLight: z.string(),
	quietZoneColor: z.string(),
	size: z.number().min(200).max(2000),
	quietZone: z.number().min(0).max(100),
	qrName: z
		.string()
		.min(3, "Min. characters is 3.")
		.max(50, "Max. characters is 50."),
	id: z.string().optional(),
});

export const urlSchema = qrCodeOptions.extend({
	url: z.string().url("Invalid URL."),
});
export const emailSchema = qrCodeOptions.extend({
	email: z
		.string()
		.nonempty("Email cannot be empty.")
		.email("Invalid email address."),
	subject: z.string().nonempty("Subject cannot be empty."),
	message: z.string().nonempty("Message cannot be empty."),
});

export const vCardSchema = qrCodeOptions.extend({
	firstName: z
		.string()
		.trim()
		.min(3, "Min characters is 3.")
		.max(50, "Max characters is 50"),
	lastName: z.string(),
	organization: z.string(),
	position: z.string(),
	phoneWork: z.string(),
	phoneMobile: z.string(),
	fax: z.string(),
	email: z
		.string()
		.optional()
		.refine(
			(value) => !value || z.string().email().safeParse(value).success,
			{
				message: "Invalid email address.",
			}
		),
	website: z
		.string()
		.optional()
		.refine(
			(value) =>
				!value ||
				z.string().url("Invalid URL.").safeParse(value).success,
			{
				message: "Invalid URL.",
			}
		),
	street: z.string(),
	zipcode: z.string(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
});

export const textSchema = qrCodeOptions.extend({
	text: z.string(),
});

export type URLFormDataTypes = z.infer<typeof urlSchema>;
export type EmailFormDataTypes = z.infer<typeof emailSchema>;
export type vCardFormDataTypes = z.infer<typeof vCardSchema>;
export type TextFormDataTypes = z.infer<typeof textSchema>;
export type QRCodeOptionsTypes = z.infer<typeof qrCodeOptions>;
export type QRDataToSubmit = { text: string } & QRCodeOptionsTypes;
