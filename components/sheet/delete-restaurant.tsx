"use client";

import {
	CreateRestaurantPayload,
	CreateRestaurantSchema,
} from "@/lib/validators/restaurants";
import { Callback } from "@/queries/auth/types";
import {
	useCreateRestaurant,
	useDeleteRestaurant,
	useGetRestaurantById,
	useGetRestaurants,
} from "@/queries/restaurants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "../ui";
import { Restaurant } from "@/queries/restaurants/types";
import { Trash } from "lucide-react";

interface Props {
	onClose?: Callback;
	restaurant: Restaurant | undefined;
}

const DeleteRestaurant: React.FC<Props> = ({ onClose, restaurant }) => {
	const router = useRouter();
	const { handleInvalidateRestaurants } = useGetRestaurants();
	const { deleteRestaurantById, isLoading } = useDeleteRestaurant({
		onSuccess() {
			toast.success("Delete restaurant successfully.");
			handleInvalidateRestaurants();
			router.push("/dashboard/restaurants");
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const handleDeleteRestaurant = () => {
		if (restaurant) {
			deleteRestaurantById({ restaurantId: restaurant.id });
		} else {
			toast.error(`Can't get restaurant id.`);
		}
	};

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle className="flex">
					<Trash className="mr-2 h-5 w-5" />
					Delete Restaurant
				</SheetTitle>
			</SheetHeader>

			<p className="text-lg text-muted-foreground my-4">
				Are you sure you want to delete restaurant:{" "}
				<b>{restaurant?.name || "Unknown"}</b>
			</p>
			<Button onClick={handleDeleteRestaurant} disabled={isLoading}>
				Delete
			</Button>
		</SheetContent>
	);
};

export default DeleteRestaurant;
