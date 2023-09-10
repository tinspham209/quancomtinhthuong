import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	SheetContent,
	SheetHeader,
	SheetTitle,
	Switch,
} from "@/components/ui";
import {
	FinalizedGroupOrderPayload,
	FinalizedGroupOrderSchema,
} from "@/lib/validators/group-orders";
import { useFinalizedGroupOrder } from "@/queries/group-orders";
import { GroupOrderDetail } from "@/queries/group-orders/types";
import { useGetRestaurants } from "@/queries/restaurants";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface Props {
	order: GroupOrderDetail;
}

const FinalizedGroupOrder: React.FC<Props> = ({ order }) => {
	const { restaurants } = useGetRestaurants();
	const form = useForm<FinalizedGroupOrderPayload>({
		resolver: zodResolver(FinalizedGroupOrderSchema),
		defaultValues: {
			groupOrderId: "",
			finalized: false,
		},
	});

	useEffect(() => {
		if (order) {
			form.reset({
				groupOrderId: order.id,
				finalized: order.finalized || false,
			});
		}
	}, [form, order]);

	const { finalizedGroupOrder, isLoading: isLoadingUpdate } =
		useFinalizedGroupOrder({
			onSuccess() {
				toast.success("Finalize Group Order successfully.");

				setTimeout(() => {
					window.location.reload();
				}, 500);
			},
			onError(error) {
				toast.error(error.message);
			},
		});

	const onSubmit = async (values: FinalizedGroupOrderPayload) => {
		finalizedGroupOrder({
			groupOrderId: values.groupOrderId,
			finalized: values.finalized,
		});
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Finalize Group Order</SheetTitle>
			</SheetHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-3 flex-col pt-8"
				>
					<FormField
						control={form.control}
						name="finalized"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between">
								<FormLabel>Finalized</FormLabel>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isLoadingUpdate}>
						Finalize
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default FinalizedGroupOrder;
