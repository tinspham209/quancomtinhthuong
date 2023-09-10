"use client";
import { useGetGroupOrderDetail } from "@/queries/group-orders";
import { useParams } from "next/navigation";
import React from "react";
import { GroupOrderDetailDishes, GroupOrderDetailHeader } from "./components";

interface Props {}

const GroupOrderDetail: React.FC<Props> = ({}) => {
	const params = useParams();

	const { groupOrder } = useGetGroupOrderDetail({
		groupOrderId: params.groupOrderId,
	});
	return (
		<div className="p-4">
			<GroupOrderDetailHeader order={groupOrder} />
			<GroupOrderDetailDishes order={groupOrder} />
		</div>
	);
};

export default GroupOrderDetail;
