import { z } from "zod";

export const CreateStoreSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	ruleDescription: z.string(),
	slackWebhookUrl: z.string(),
	imgUrl: z.string(),
	userId: z.string().min(1),
});

export type CreateStorePayload = z.infer<typeof CreateStoreSchema>;

export const UpdateStoreSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	ruleDescription: z.string(),
	imgUrl: z.string(),
	storeId: z.string().optional(),
});

export type UpdateStorePayload = z.infer<typeof UpdateStoreSchema>;

export type CreateStoreResponse = {
	id: string;
	userName: string;
	name: string;
	description: string;
	imgUrl: string;
};

export type GetStoresByUserName = {
	userName: string;
};
