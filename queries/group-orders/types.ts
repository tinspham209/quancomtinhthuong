import { Restaurant } from "../restaurants/types";

export type GroupOrderDetail = {
	id: string;
	limit: number;
	discount: number;
	restaurantId: string;
	title: string;
	imgUrl: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	finalized: boolean;
	storeId: string;
	restaurant: Restaurant;
	dueTime: string;
};

export type GroupOrderList = {
	dateTabs: string[];
	groupOrders: GroupOrderDetail[][];
};
