"use client";

import JsonView from "@/components/json-view";
import {
	Button,
	Card,
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
			<div className="flex justify-start md:justify-between">
				<h3 className="text-3xl font-bold leading-none tracking-tight">
					Nhà hàng
				</h3>
				<Button>Create Restaurant</Button>
			</div>
			<div className="mt-2">
				<div className="justify-center gap-6 rounded-lg p-4 grid grid-cold-2 md:grid-cols-3 lg:grid-cols-4">
					{restaurants.map((restaurant) => (
						<Card key={restaurant.id}>
							<CardHeader>
								<CardTitle
									style={{
										height: 48,
										display: "-webkit-box",
										overflow: "hidden",
										lineHeight: "24px",
										WebkitBoxOrient: "vertical",
										WebkitLineClamp: 2,
									}}
								>
									{restaurant.name}
								</CardTitle>
								<CardDescription>{restaurant.description}</CardDescription>
							</CardHeader>
							{/* <CardContent></CardContent> */}
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
