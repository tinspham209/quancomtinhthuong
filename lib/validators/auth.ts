import { z } from 'zod';

export const LoginSchema = z.object({
  userName: z.string({}).min(1),
  password: z
    .string({
      required_error: 'This field is required',
    })
    .min(1),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  userName: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => /^([a-z0-9_.-]){3,20}$/.test(value), 'Invalid format username'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1),
  slackId: z.string(),
  roleId: z.number(),
});

export type SignupPayload = z.infer<typeof SignupSchema>;

export const ChangePasswordSchema = z.object({
  userName: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => /^([a-z0-9_.-]){3,20}$/.test(value), 'Invalid format username'),
  currPassword: z
    .string({
      required_error: 'This field is required',
    })
    .min(1),
  newPassword: z
    .string({
      required_error: 'This field is required',
    })
    .min(1),
});

export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;
