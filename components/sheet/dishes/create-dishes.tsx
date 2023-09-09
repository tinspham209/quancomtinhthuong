"use client";

import { Callback } from "@/queries/auth/types";

import { CreateDishSchema, DishPayload } from "@/lib/validators";
import { useCreateDishes, useGetDishesByRestaurantId } from "@/queries/dishes";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
	onClose: Callback;
	restaurantId: string;
	categories: string[];
}

const CreateDishes: React.FC<Props> = ({
	onClose,
	restaurantId,
	categories,
}) => {
	const { handleInvalidateDishes } = useGetDishesByRestaurantId();

	const form = useForm<DishPayload>({
		resolver: zodResolver(CreateDishSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 1000,
			imgUrl: "",
			category: "No Category",
		},
	});

	const { createDishes, isLoading: isLoadingCreate } = useCreateDishes({
		onSuccess(data) {
			handleInvalidateDishes();
			onClose();
			toast.success(`Create dishes successfully.`);
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = async (values: DishPayload) => {
		createDishes({
			restaurantId,
			dishes: [
				{
					name: values.name.trim(),
					description: values.description.trim(),
					price: values.price,
					imgUrl: values.imgUrl.trim(),
					category: values.category.trim(),
				},
			],
		});
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Create Dish</SheetTitle>
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
								<FormLabel>Dish name *</FormLabel>
								<FormControl>
									<Input placeholder="Dish name" {...field} />
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
								<FormLabel>Dish description *</FormLabel>
								<FormControl>
									<Input placeholder="Dish description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price *</FormLabel>
								<FormControl>
									<Input placeholder="1000" type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category *</FormLabel>
								<FormControl>
									<Input placeholder="Select Category" {...field} />
								</FormControl>
								{/* <Select
									onValueChange={field.onChange}
									required
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder={"Select Category"} />
										</SelectTrigger>
									</FormControl>
									<SelectContent ref={field.ref}>
										{categories.map((item, index) => (
											<SelectItem key={`${item}-${index}`} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="imgUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Dish thumbnail</FormLabel>
								<FormControl>
									<Input placeholder="Dish thumbnail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoadingCreate}>
						{"Create"}
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default CreateDishes;
