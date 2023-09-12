import { UpdateStorePayload, UpdateStoreSchema } from "@/lib/validators";
import { Store } from "@/queries/auth/types";
import { useUpdateStore } from "@/queries/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "../../ui";

interface Props {
	store: Store | undefined;
}

const UpdateStore: React.FC<Props> = ({ store }) => {
	const form = useForm<UpdateStorePayload>({
		resolver: zodResolver(UpdateStoreSchema),
		defaultValues: {
			name: "",
			description: "",
			ruleDescription: "",
			imgUrl: "",
			storeId: store?.id,
			bankInfo: "",
			storeSlug: "",
		},
	});

	useEffect(() => {
		if (store) {
			form.reset({
				name: store.name || "",
				description: store.description || "",
				ruleDescription: store.ruleDescription || "",
				imgUrl: store.imgUrl || "",
				storeId: store.id,
				bankInfo: store.bankInfo || "",
				storeSlug: store.storeSlug || "",
			});
		}
	}, [form, store]);

	const { updateStore, isLoading } = useUpdateStore({
		onSuccess(data) {
			toast.success(`Update store (${store?.name}) successfully.`);
			setTimeout(() => {
				window.location.reload();
			}, 500);
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = async (values: UpdateStorePayload) => {
		if (store) {
			updateStore({
				name: values.name,
				description: values.description,
				ruleDescription: values.ruleDescription,
				imgUrl: values.imgUrl,
				storeId: values.storeId,
				storeSlug: values.storeSlug,
				bankInfo: values.bankInfo,
			});
		} else {
			toast.error(`Can't get store Id`);
		}
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Update Store</SheetTitle>
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
						name="ruleDescription"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rule Description</FormLabel>
								<FormControl>
									<Input multiple placeholder="Rule Description" {...field} />
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
						Update
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default UpdateStore;
