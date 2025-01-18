import { getImageDimensions } from "@lib/helpers";
import { z } from "zod";

// Shared Schema Components
export const qrCodeOptions = z.object({
	colorDark: z.string(),
	colorLight: z.string(),
	quietZoneColor: z.string(),
	size: z.number().min(200).max(2000),
	quietZone: z.number().min(0).max(100),
	dots: z.number().min(0.1).max(1),
});

const defaultOptions = z.object({
	name: z
		.string()
		.min(3, "Min. characters is 3.")
		.max(50, "Max. characters is 50."),
	id: z.string().optional(),
});

export const urlSchema = defaultOptions.extend({
	url: z.string().url("Invalid URL."),
});
export const emailSchema = defaultOptions.extend({
	email: z
		.string()
		.nonempty("Email cannot be empty.")
		.email("Invalid email address."),
	subject: z.string().nonempty("Subject cannot be empty."),
	message: z.string().nonempty("Message cannot be empty."),
});

const MIN_WIDTH = 400; // Minimum width in pixels
const MIN_HEIGHT = 400;

export const vCardSchema = defaultOptions.extend({
	id: z.string().optional(),
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
	image: z
		.instanceof(FileList)
		.refine(
			(file) => {
				if (file.length > 0) {
					return file[0] && file[0].size <= 2 * 1024 * 1024;
				}
				return true; // To make file optional
			},
			{
				message: "File size must be less than 2MB",
			}
		)
		.refine(
			(file) => {
				if (file.length > 0) {
					console.log("here");
					return /\.(jpeg|jpg|png|gif|svg)$/i.test(file[0].name);
				}
				return true; // To make file optional
			},
			{
				message:
					"File must have a valid extension (jpeg, jpg, png, gif, svg).",
			}
		)
		.refine(
			async (files) => {
				const file = files[0];
				if (!file) return true;

				const img = await getImageDimensions(file);
				const isSquare = img.width === img.height;
				if (isSquare && img.height <= 400) {
					return true;
				}
				return false;
			},
			{
				message: `Image must be square, and max ${MIN_WIDTH}x${MIN_HEIGHT}px.`,
			}
		)
		.optional(),
	imageBase64: z.string().optional(),
	imageType: z.string().optional(),
});

export const textSchema = defaultOptions.extend({
	text: z.string(),
});

export type URLFormDataTypes = z.infer<typeof urlSchema>;
export type EmailFormDataTypes = z.infer<typeof emailSchema>;
export type vCardFormDataTypes = z.infer<typeof vCardSchema>;
export type TextFormDataTypes = z.infer<typeof textSchema>;
export type QRCodeOptionsTypes = z.infer<typeof qrCodeOptions>;
export type QRDataToSubmit = { text: string } & QRCodeOptionsTypes;
