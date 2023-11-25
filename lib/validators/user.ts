import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().min(1),
  phoneNumber: z.string().min(1),
});

export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
