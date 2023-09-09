import { z } from "zod";

export const CreateDishSchema = z.object({
	name: z.string().min(1, "This field is required"),
	description: z.string(),
	price: z.preprocess(
		(v) => parseInt(z.any().parse(v), 10),
		z
			.number({
				invalid_type_error: "This field is required",
			})
			.positive()
	),
	imgUrl: z.string(),
	category: z.string(),
});

export type DishPayload = z.infer<typeof CreateDishSchema>;

export type CreateDishPayload = {
	restaurantId: string;
	dishes: DishPayload[];
};
