"use client";

import JsonView from "@/components/json-view";
import { CreateRestaurant, DeleteRestaurant } from "@/components/sheet";
import { Button, Sheet, SheetTrigger } from "@/components/ui";
import { useGetRestaurantById } from "@/queries/restaurants";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface Props {}

const RestaurantDetailPage: React.FC<Props> = ({}) => {
	const params = useParams();

	const { restaurantById: restaurant } = useGetRestaurantById({
		restaurantId: params?.slug,
	});
	const [openUpdateRestaurant, setOpenUpdateRestaurant] = useState(false);

	return (
		<div className="p-4">
			<div className="flex flex-col md:flex-row justify-between">
				<div className="flex flex-col">
					<h3 className="text-3xl font-bold leading-none tracking-tight">
						{restaurant?.name || "Restaurant Detail"}
					</h3>
					{restaurant?.description && (
						<p className="text-xl text-muted-foreground">
							{restaurant.description}
						</p>
					)}
				</div>
				<div className="flex gap-2 mt-4 sm:mt-0">
					<div>
						<Sheet
							open={openUpdateRestaurant}
							onOpenChange={setOpenUpdateRestaurant}
						>
							<SheetTrigger asChild>
								<Button>Update Restaurant</Button>
							</SheetTrigger>
							<CreateRestaurant
								onClose={() => {
									setOpenUpdateRestaurant(false);
								}}
								isEdit
								restaurant={restaurant}
							/>
						</Sheet>
					</div>
					<div>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant={"destructive"}>
									<Trash className="mr-2 h-5 w-5" />
									Delete Restaurant
								</Button>
							</SheetTrigger>
							<DeleteRestaurant restaurant={restaurant} />
						</Sheet>
					</div>
				</div>
			</div>
			<JsonView src={restaurant} />
		</div>
	);
};

export default RestaurantDetailPage;
