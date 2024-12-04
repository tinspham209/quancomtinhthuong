import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imgUrls: z
    .array(
      z.object({
        url: z.string(),
      }),
    )
    .min(1),
  amount: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .nonnegative(),
  ),
});

export const UpdateInvoiceSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  imgUrls: z
    .array(
      z.object({
        url: z.string(),
      }),
    )
    .min(1),
  amount: z.preprocess(
    (v) => parseInt(z.any().parse(v), 10),
    z
      .number({
        invalid_type_error: 'This field is required',
      })
      .nonnegative(),
  ),
});

export type CreateInvoicePayload = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoicePayload = z.infer<typeof UpdateInvoiceSchema>;
