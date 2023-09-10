import { Dish } from "../dishes/types";

export type OrderDetail = {
	id: number;
	amount: number;
	status: OrderStatus;
	confirm: boolean;
	orderNumber: number;
	groupOrderId: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
	dishId: string;
	orderCode: number;
	paymentLink: string;
	limitAdditionalOrder: number;
	Dish: Dish;
};

export enum OrderStatus {
	PAID = "PAID",
	NOPE = "NOPE",
}
