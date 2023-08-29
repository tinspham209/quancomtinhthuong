"use client";

import JsonView from "@/components/json-view";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { useGetRestaurants } from "@/queries/restaurants";
import Link from "next/link";
import React from "react";

interface Props {}

const RestaurantsPage: React.FC<Props> = ({}) => {
	const { restaurants } = useGetRestaurants();
	return (
		<div className="p-4">
			<h3 className="text-3xl fw-bold">Restaurants:</h3>
			<div className="mt-2">
				<div className="justify-center gap-6 rounded-lg p-4 grid grid-cold-2 md:grid-cols-3 lg:grid-cols-4">
					{restaurants.map((restaurant) => (
						<Card key={restaurant.id}>
							<CardHeader>
								<CardTitle>{restaurant.name}</CardTitle>
								<CardDescription>{restaurant.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<Avatar className="w-full rounded-sm">
									<AvatarImage alt={`image ${restaurant.name}`} />
									<AvatarFallback className="rounded-sm">
										{restaurant.name.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
							</CardContent>
							<CardFooter className="flex justify-end">
								<Link href={`/dashboard/${restaurant.id}`}>
									<Button>Go to detail</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>

			<JsonView src={restaurants} />
		</div>
	);
};

export default RestaurantsPage;
