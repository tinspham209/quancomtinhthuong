"use client";

import JsonView from "@/components/json-view";
import { useGetRestaurantById } from "@/queries/restaurants";
import { useParams } from "next/navigation";
import React from "react";
import RestaurantHeader from "./restaurant-header";
import { useGetDishesByRestaurantId } from "@/queries/dishes";
import DishesCtn from "./dishes";

interface Props {}

const RestaurantDetailPage: React.FC<Props> = ({}) => {
	const params = useParams();

	const { restaurantById: restaurant } = useGetRestaurantById({
		restaurantId: params.slug,
	});

	const { dishes } = useGetDishesByRestaurantId({
		restaurantId: params.slug,
	});

	return (
		<div className="p-4">
			<RestaurantHeader restaurant={restaurant} />
			<DishesCtn dishes={dishes} restaurantId={params.slug} />
			<JsonView src={restaurant} />
			<JsonView src={dishes} />
		</div>
	);
};

export default RestaurantDetailPage;
