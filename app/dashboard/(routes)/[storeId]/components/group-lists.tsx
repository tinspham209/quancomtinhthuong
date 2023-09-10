"use client";
import {
	Button,
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupOrderList } from "@/queries/group-orders/types";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import GroupOrderHeader from "./group-order-header";

interface Props {
	groupLists: GroupOrderList | undefined;
}

const GroupLists: React.FC<Props> = ({ groupLists }) => {
	return (
		<div className="mt-4">
			<GroupOrderHeader />
			<Tabs defaultValue={`0`}>
				<TabsList>
					{groupLists?.dateTabs.map((tab, index) => (
						<TabsTrigger value={`${index}`} key={index}>
							{tab}
						</TabsTrigger>
					))}
				</TabsList>
				{groupLists?.groupOrders.map((group, index) => (
					<TabsContent value={`${index}`} key={index}>
						<div className="justify-center gap-6 rounded-lg p-4 grid grid-cols1 md:grid-cols-3 lg:grid-cols-4">
							{group.map((order, index) => (
								<Card key={order.id}>
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
											{order.restaurant.name}
										</CardTitle>
										<CardDescription>
											Discount: {order.discount}
											<br />
											Limit: {order.limit}
										</CardDescription>
									</CardHeader>
									{/* <CardContent></CardContent> */}
									<CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between">
										<div className="flex gap-1">
											<Button variant={"outline"}>
												<Pen className="w-4 h-4" />
											</Button>
											<Button variant={"destructive"}>
												<Trash className="w-4 h-4" />
											</Button>
										</div>
										<Link
											href={`/dashboard/${order.storeId}/group-order/${order.id}`}
											className="mt-2 sm:mt-0 ml-auto"
										>
											<Button>Go to detail</Button>
										</Link>
									</CardFooter>
								</Card>
							))}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default GroupLists;
