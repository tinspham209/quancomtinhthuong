"use client";

import { useGetDishesByRestaurantId } from "@/queries/dishes";
import { useGetRestaurantById } from "@/queries/restaurants";
import { useParams } from "next/navigation";
import React from "react";
import { Dishes, RestaurantHeader } from "./components";

interface Props {}

const RestaurantDetailPage: React.FC<Props> = ({}) => {
	const params = useParams();

	const { restaurantById: restaurant } = useGetRestaurantById({
		restaurantId: params.restaurantId,
	});

	const { dishes } = useGetDishesByRestaurantId({
		restaurantId: params.restaurantId,
	});

	return (
		<div className="p-4">
			<RestaurantHeader restaurant={restaurant} />
			<Dishes dishes={dishes} restaurantId={params.restaurantId} />
		</div>
	);
};

export default RestaurantDetailPage;
