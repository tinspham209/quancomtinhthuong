import { z } from "zod";

export const LoginSchema = z.object({
	userName: z.string({}).min(1),
	password: z
		.string({
			required_error: "This field is required",
		})
		.min(1),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
	name: z.string().min(1),
	userName: z.string({}).min(4),
	password: z.string().min(6),
	slackId: z.string(),
	roleId: z.number(),
});

export type SignupPayload = z.infer<typeof SignupSchema>;
