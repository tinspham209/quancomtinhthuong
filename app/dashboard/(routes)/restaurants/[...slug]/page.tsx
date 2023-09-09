"use client";

import JsonView from "@/components/json-view";
import { useGetRestaurantById } from "@/queries/restaurants";
import { useParams } from "next/navigation";
import React from "react";
import RestaurantHeader from "./restaurant-header";

interface Props {}

const RestaurantDetailPage: React.FC<Props> = ({}) => {
	const params = useParams();

	const { restaurantById: restaurant } = useGetRestaurantById({
		restaurantId: params?.slug,
	});

	return (
		<div className="p-4">
			<RestaurantHeader restaurant={restaurant} />
			<JsonView src={restaurant} />
		</div>
	);
};

export default RestaurantDetailPage;
