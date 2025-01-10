import { z } from "zod";

export const registerSchema = z
	.object({
		firstName: z
			.string()
			.nonempty("First name cannot be empty.")
			.max(50, "Min characters is 50.")
			.min(5, "Max characters is 5.")
			.toLowerCase(),
		lastName: z
			.string()
			.nonempty("Last name cannot be empty.")
			.max(50, "Min characters is 50.")
			.min(5, "Max characters is 5.")
			.toLowerCase(),
		email: z
			.string()
			.nonempty("Email cannot be empty.")
			.email("Invalid email address.")
			.toLowerCase(),
		password: z
			.string()
			.nonempty("Password cannot be empty.")
			.min(8, "Min password length is 8 characters.")
			.max(16, "Max password length is 16 characters."),
		confirmPassword: z
			.string()
			.nonempty("Confirm password cannot be empty."),
		username: z
			.string()
			.nonempty("User name cannot be empty.")
			.max(50, "Min characters is 50.")
			.min(5, "Max characters is 5.")
			.toLowerCase(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match.",
		path: ["confirmPassword"], // This points to where the error will appear
	});

export const loginSchema = z.object({
	email: z
		.string()
		.nonempty("Email cannot be empty.")
		.email("Invalid email address.")
		.toLowerCase(),
	password: z.string().nonempty("Password cannot be empty."),
});

export type RegisterFormDataTypes = z.infer<typeof registerSchema>;
export type LoginFormDataTypes = z.infer<typeof loginSchema>;
