import { z } from "zod";

export const CreateGroupOrderSchema = z.object({
	storeId: z.string().min(1),
	restaurantId: z.string().min(1),
	limit: z.preprocess(
		(v) => parseInt(z.any().parse(v), 10),
		z
			.number({
				invalid_type_error: "This field is required",
			})
			.positive()
	),
	discount: z.preprocess(
		(v) => parseInt(z.any().parse(v), 10),
		z
			.number({
				invalid_type_error: "This field is required",
			})
			.positive()
	),
});

export type CreateGroupOrderPayload = z.infer<typeof CreateGroupOrderSchema>;
