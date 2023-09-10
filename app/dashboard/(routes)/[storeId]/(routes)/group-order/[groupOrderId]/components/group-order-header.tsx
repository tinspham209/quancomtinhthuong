import { GroupOrderDetail } from "@/queries/group-orders/types";
import dayjs from "dayjs";
import React from "react";

interface Props {
	order: GroupOrderDetail | undefined;
}

const GroupOrderHeader: React.FC<Props> = ({ order }) => {
	return (
		<div className="mb-4">
			<div className="flex flex-col">
				<h1 className="text-3xl font-bold leading-none tracking-tight mb-1">
					{order?.title || "Unknown"}
				</h1>
				{order?.description && (
					<p className="text-xl text-muted-foreground mb-1">
						{order.description}
					</p>
				)}
				<p className="text-xl text-muted-foreground">
					Date: {dayjs(order?.createdAt).format("DD-MMM-YYYY")}
				</p>
			</div>
		</div>
	);
};

export default GroupOrderHeader;
