"use client";

import { Callback } from "@/queries/auth/types";

import { CreateDishSchema, DishPayload } from "@/lib/validators";
import {
	useCreateDishes,
	useGetDishesByRestaurantId,
	useUpdateDish,
} from "@/queries/dishes";
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
import { Dish } from "@/queries/dishes/types";

interface Props {
	dish: Dish;
}

const UpdateDish: React.FC<Props> = ({ dish }) => {
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

	useEffect(() => {
		if (dish) {
			form.reset({
				name: dish.name,
				description: dish.description || "",
				price: dish.price,
				imgUrl: dish.imgUrl || "",
				category: dish.category || "No Category",
			});
		}
	}, [form, dish]);

	const { handleInvalidateDishes } = useGetDishesByRestaurantId();

	const { updateDish, isLoading: isLoadingCreate } = useUpdateDish({
		onSuccess(data) {
			handleInvalidateDishes();
			toast.success(`Update dish successfully.`);

			setTimeout(() => {
				window.location.reload();
			}, 500);
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = async (values: DishPayload) => {
		updateDish({
			id: dish.id,
			name: values.name.trim(),
			description: values.description.trim(),
			price: +values.price,
			imgUrl: values.imgUrl.trim(),
			category: values.category.trim(),
			restaurantId: dish.restaurantId,
		});
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Update Dish</SheetTitle>
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
								<FormControl ref={field.ref}>
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
								<FormLabel>Dish description</FormLabel>
								<FormControl ref={field.ref}>
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
								<FormControl ref={field.ref}>
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
								<FormLabel>Category</FormLabel>
								<FormControl ref={field.ref}>
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
								<FormControl ref={field.ref}>
									<Input placeholder="Dish thumbnail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isLoadingCreate}>
						{"Update"}
					</Button>
				</form>
			</Form>
		</SheetContent>
	);
};

export default UpdateDish;
