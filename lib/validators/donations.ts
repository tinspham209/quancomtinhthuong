import { z } from 'zod';

export const CreateGroupDonationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imgUrls: z
    .array(
      z.object({
        url: z.string(),
      }),
    )
    .min(1),
  userId: z.string(),
  storeSlug: z.string(),
  donationTarget: z.number().min(1000),
  finalized: z.boolean().optional().nullable(),
  dueDate: z.number(),
  dueDateTemp: z.date().optional().nullable(),
});

export type CreateGroupDonationPayload = z.infer<typeof CreateGroupDonationSchema>;

export const MakeDonationSchema = z.object({
  donationId: z.string().min(1),
  userId: z.string().min(1),
  donationAmount: z.number().min(5000),
  storeSlug: z.string().min(1),
  comment: z.string().optional(),
});

export type MakeDonationPayload = z.infer<typeof MakeDonationSchema>;
