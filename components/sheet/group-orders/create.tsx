import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PopoverContent,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
	CreateGroupOrderPayload,
	CreateGroupOrderSchema,
} from "@/lib/validators/group-orders";
import { useCreateGroupOrder } from "@/queries/group-orders";
import { useGetRestaurants } from "@/queries/restaurants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface Props {
	storeId: string;
}

const CreateGroupOrder: React.FC<Props> = ({ storeId }) => {
	const { restaurants } = useGetRestaurants();
	const form = useForm<CreateGroupOrderPayload>({
		resolver: zodResolver(CreateGroupOrderSchema),
		defaultValues: {
			title: "",
			description: "",
			storeId: storeId,
			restaurantId: "",
			discount: 0,
			limit: 15,
		},
	});

	const { createGroupOrder, isLoading: isLoadingCreate } = useCreateGroupOrder({
		onSuccess() {
			toast.success("Create Group Order successfully.");

			setTimeout(() => {
				window.location.reload();
			}, 500);
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = async (values: CreateGroupOrderPayload) => {
		createGroupOrder({
			title: values.title.trim(),
			description: values.description.trim(),
			storeId: values.storeId,
			restaurantId: values.restaurantId,
			discount: values.discount,
			limit: values.limit,
		});
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Create Group Order</SheetTitle>
			</SheetHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex gap-3 flex-col pt-8"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Group Order Name *</FormLabel>
								<FormControl>
									<Input placeholder="Group Order Name" {...field} />
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
								<FormLabel>Group Order Description</FormLabel>
								<FormControl>
									<Input placeholder="Group Order Description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="restaurantId"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Restaurant</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													"justify-between",

													!field.value && "text-muted-foreground"
												)}
											>
												{field.value
													? restaurants.find(
															(restaurant) => restaurant.id === field.value
													  )?.name
													: "Select Restaurant"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="p-0">
										<Command>
											<CommandInput placeholder="Search Restaurant..." />
											<CommandEmpty>No restaurant found.</CommandEmpty>
											<CommandGroup>
												{restaurants.map((restaurant) => (
													<CommandItem
														value={restaurant.id}
														key={restaurant.id}
														onSelect={() => {
															form.setValue("restaurantId", restaurant.id);
														}}
														className="cursor-pointer text-left"
													>
														<Check
															className={cn(
																"mr-2 h-4 w-4",
																restaurant.id === field.value
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
														{restaurant.name}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="discount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount</FormLabel>
								<FormControl>
									<Input placeholder="Discount" type="number" {...field} />
								</FormControl>
								<FormDescription>Example: 2000</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="limit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Limit</FormLabel>
								<FormControl>
									<Input
										placeholder="Limit number of Order"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormItem>
						<FormLabel>Date</FormLabel>
						<FormControl>
							<Input
								placeholder="Date"
								value={dayjs().format("DD-MMM-YYYY")}
								disabled
							/>
						</FormControl>
					</FormItem>

					<Button type="submit" disabled={isLoadingCreate}>
						Create
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default CreateGroupOrder;
