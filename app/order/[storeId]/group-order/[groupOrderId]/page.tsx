"use client";

import { useGetDishesByRestaurantId } from "@/queries/dishes";
import { useGetGroupOrderDetail } from "@/queries/group-orders";
import { useParams } from "next/navigation";
import React from "react";
import { OrderDishesCtn, OrderHeader } from "./components";

interface Props {}

const OrderCtn: React.FC<Props> = ({}) => {
	const { storeId, groupOrderId } = useParams();
	const { groupOrder } = useGetGroupOrderDetail({
		groupOrderId: groupOrderId,
	});
	const { dishes } = useGetDishesByRestaurantId({
		restaurantId: groupOrder?.restaurantId,
	});

	return (
		<div className="p-4">
			<OrderHeader order={groupOrder} />
			<OrderDishesCtn
				dishes={dishes}
				storeId={storeId}
				groupOrderId={groupOrderId}
				isFinalized={groupOrder?.finalized || false}
			/>
		</div>
	);
};

export default OrderCtn;
