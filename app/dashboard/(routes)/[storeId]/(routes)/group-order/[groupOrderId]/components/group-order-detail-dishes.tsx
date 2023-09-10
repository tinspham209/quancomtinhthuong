import { Dishes } from "@/app/dashboard/(routes)/restaurants/[restaurantId]/components";
import { useGetDishesByRestaurantId } from "@/queries/dishes";
import { GroupOrderDetail } from "@/queries/group-orders/types";
import dayjs from "dayjs";
import React from "react";

interface Props {
	order: GroupOrderDetail | undefined;
}

const GroupOrderDetailDishes: React.FC<Props> = ({ order }) => {
	const { dishes } = useGetDishesByRestaurantId({
		restaurantId: order?.restaurantId,
	});
	return (
		<div className="mb-4">
			<div className="flex flex-col">
				<h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
					{order?.restaurant.name || "Unknown"}
				</h1>
			</div>
			<Dishes
				dishes={dishes}
				restaurantId={order?.restaurantId || ""}
				isShowEdit={false}
			/>
		</div>
	);
};

export default GroupOrderDetailDishes;
