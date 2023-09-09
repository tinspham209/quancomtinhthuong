import { z } from "zod";

export const CreateDishSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().positive(),
	imgUrl: z.string(),
	category: z.string(),
});

export type DishPayload = z.infer<typeof CreateDishSchema>;

export type CreateDishPayload = {
	restaurantId: string;
	dishes: DishPayload[];
};
