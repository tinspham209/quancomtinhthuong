"use client";

import JsonView from "@/components/json-view";
import { useGetRestaurantById } from "@/queries/restaurants";
import { useParams } from "next/navigation";
import React from "react";

interface Props {}

const RestaurantDetailPage: React.FC<Props> = ({}) => {
	const params = useParams();
	const { restaurantById } = useGetRestaurantById({
		restaurantId: params?.slug,
	});
	return (
		<div className="p-4">
			<h1>RestaurantDetailPage</h1>
			<JsonView src={restaurantById} />
		</div>
	);
};

export default RestaurantDetailPage;
