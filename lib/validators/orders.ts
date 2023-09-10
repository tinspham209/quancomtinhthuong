import { z } from "zod";

export const CreateOrderSchema = z.object({
	status: z.string().min(1),
	userId: z.string().min(1),
	groupOrderId: z.string().min(1),
	dishId: z.string().min(1),
	amount: z.preprocess(
		(v) => parseInt(z.any().parse(v), 10),
		z
			.number({
				invalid_type_error: "This field is required",
			})
			.nonnegative()
	),
});

export type CreateOrderPayload = z.infer<typeof CreateOrderSchema>;
