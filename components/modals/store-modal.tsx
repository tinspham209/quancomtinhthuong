"use client";

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@/components/ui";
import { CreateStorePayload, CreateStoreSchema } from "@/lib/validators";
import { useCreateStore } from "@/queries/stores";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
export const StoreModal = () => {
	const storeModal = useStoreModal();

	const { createStore, isLoading } = useCreateStore({
		onSuccess(data, variables) {
			window.location.assign(`/${data.id}`);
		},
		onError(error) {
			if (error instanceof AxiosError) {
				toast.error(`${JSON.stringify(error?.response?.data)}`);
			}
		},
	});

	const form = useForm<CreateStorePayload>({
		resolver: zodResolver(CreateStoreSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: CreateStorePayload) => {
		createStore(values);
	};

	return (
		<Modal
			title="Create store"
			description="Add a new store to manage products and categories"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												placeholder="E-Commerce"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
									disabled={isLoading}
									variant={"outline"}
									onClick={storeModal.onClose}
								>
									Cancel
								</Button>
								<Button disabled={isLoading} type="submit">
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
