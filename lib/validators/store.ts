import { z } from "zod";

export const CreateStoreSchema = z.object({
	name: z.string().min(1),
});

export type CreateStorePayload = z.infer<typeof CreateStoreSchema>;
