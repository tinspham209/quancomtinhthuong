import { z } from 'zod';

export const CreateRestaurantSchema = z.object({
  name: z.string().min(1),
  link: z.string().min(1),
  description: z.string(),
});

export type CreateRestaurantPayload = z.infer<typeof CreateRestaurantSchema>;
