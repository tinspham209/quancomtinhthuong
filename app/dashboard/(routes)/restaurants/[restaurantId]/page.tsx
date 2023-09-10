"use client";

import JsonView from "@/components/json-view";
import { useGetRestaurantById } from "@/queries/restaurants";
import { useParams } from "next/navigation";
import React from "react";
import { RestaurantHeader, Dishes } from "./components";
import { useGetDishesByRestaurantId } from "@/queries/dishes";

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
			<JsonView src={restaurant} />
			<JsonView src={dishes} />
		</div>
	);
};

export default RestaurantDetailPage;
