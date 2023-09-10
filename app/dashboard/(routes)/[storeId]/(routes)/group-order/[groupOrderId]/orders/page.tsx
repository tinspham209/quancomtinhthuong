"use client";

import JsonView from "@/components/json-view";
import { useGetOrdersByGroupOrderId } from "@/queries/orders";
import { useParams } from "next/navigation";
import React from "react";

interface Props {}

const OrdersOfGroupOrders: React.FC<Props> = ({}) => {
	const params = useParams();
	const groupOrderId = params.groupOrderId;
	const { orders } = useGetOrdersByGroupOrderId({
		groupOrderId: groupOrderId,
		enabled: !!groupOrderId,
	});
	return (
		<div className="p-4">
			<h1>Orders of Group Order {groupOrderId}</h1>
			<JsonView src={orders} />
		</div>
	);
};

export default OrdersOfGroupOrders;
