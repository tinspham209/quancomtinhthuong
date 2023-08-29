import React from "react";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "../ui";
import { toast } from "react-hot-toast";
import { Callback } from "@/queries/auth/types";
import { useForm } from "react-hook-form";
import { CreateStorePayload, CreateStoreSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileStore } from "@/hooks";
import { useCreateStore, useGetStoresByUserName } from "@/queries/stores";
import { useRouter } from "next/navigation";
import { useProfile } from "@/queries/auth";

interface CreateStoreProps {
	onClose: Callback;
}

const CreateStore: React.FC<CreateStoreProps> = ({ onClose }) => {
	const router = useRouter();
	const { profile } = useProfileStore();

	const { handleInvalidateStoresByUserName, getStoresByUserName } =
		useGetStoresByUserName({
			userName: profile?.userName || "",
		});

	const form = useForm<CreateStorePayload>({
		resolver: zodResolver(CreateStoreSchema),
		defaultValues: {
			name: "",
			description: "",
			slackWebhookUrl: "",
			ruleDescription: "",
			imgUrl: "",
			userId: profile?.id,
		},
	});

	const { createStore, isLoading } = useCreateStore({
		onSuccess(data) {
			handleInvalidateStoresByUserName();
			onClose();
			toast.success(`Create store (${data.name}) successfully.`);
			router.push(`/dashboard/${data.id}`);
		},
		onError(error) {
			toast.error(error.message);
		},
		onSettled() {
			getStoresByUserName();
		},
	});

	const onSubmit = async (values: CreateStorePayload) => {
		createStore({
			name: values.name,
			description: values.description,
			ruleDescription: values.ruleDescription,
			slackWebhookUrl: values.slackWebhookUrl,
			imgUrl: values.imgUrl,
			userId: values.userId,
		});
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Create Store</SheetTitle>
			</SheetHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-3 flex-col pt-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Store name *</FormLabel>
								<FormControl>
									<Input placeholder="Store name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Store description *</FormLabel>
								<FormControl>
									<Input placeholder="Store description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="slackWebhookUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Your Channel Slack webhook url</FormLabel>
								<FormControl>
									<Input
										placeholder="Start with https://hooks.slack.com/service...."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imgUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Store Thumbnail URL</FormLabel>
								<FormControl>
									<Input placeholder="URL" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoading}>
						Create
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default CreateStore;
