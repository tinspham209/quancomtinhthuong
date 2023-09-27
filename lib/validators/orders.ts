import { z } from 'zod';

export const CreateOrderSchema = z.object({
  status: z.string().min(1),
  userId: z.string(),
  groupOrderId: z.string().min(1),
  dishId: z.string().min(1),
  amount: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .nonnegative(),
  ),
  note: z.string().optional(),
  orderId: z.string().optional(),
  orderNumber: z.number().nullable().optional(),
  additionalPrice: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .nonnegative()
      .optional(),
  ),
  additionalNote: z.string().optional(),
});

export type CreateOrderPayload = z.infer<typeof CreateOrderSchema>;
