import { z } from 'zod';

export const CreateGroupOrderSchema = z.object({
  title: z.string().min(1),
  description: z.string(),

  storeId: z.string().min(1),
  restaurantId: z.string().min(1),
  limit: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .positive(),
  ),
  discount: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .nonnegative(),
  ),
  dueTime: z.string().min(1),
});

export type CreateGroupOrderPayload = z.infer<typeof CreateGroupOrderSchema>;

export const UpdateGroupOrderSchema = z.object({
  title: z.string().min(1),
  description: z.string(),

  groupOrderId: z.string().optional(),
  storeId: z.string().min(1),
  restaurantId: z.string().min(1),
  limit: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .positive(),
  ),
  discount: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .nonnegative(),
  ),
  dueTime: z.string().min(1),
});

export type UpdateGroupOrderPayload = z.infer<typeof UpdateGroupOrderSchema>;

export const FinalizedGroupOrderSchema = z.object({
  finalized: z.boolean(),
  groupOrderId: z.string().optional(),
});

export type FinalizedGroupOrderPayload = z.infer<typeof FinalizedGroupOrderSchema>;
