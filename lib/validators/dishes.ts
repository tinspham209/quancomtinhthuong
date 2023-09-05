import { z } from "zod";

export const CreateDishSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().positive(),
	imgUrl: z.string(),
	restaurantId: z.string().min(1),
});

export type CreateDishPayload = z.infer<typeof CreateDishSchema>;
