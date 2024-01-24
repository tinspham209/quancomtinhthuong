import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().min(1),
  imgUrl: z.string().min(1),
  email: z.string().min(1),
  phoneNumber: z.string().min(1),
});

export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
