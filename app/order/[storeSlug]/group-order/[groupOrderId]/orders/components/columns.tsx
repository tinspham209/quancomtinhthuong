"use client";

import { UpdateOrder } from "@/components/sheet";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Sheet,
	SheetTrigger,
} from "@/components/ui";
import { OrderDetail, OrderStatus } from "@/queries/orders/types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";

export type OrderRow = {
	id: number;
	groupOrderId: string;
	userId: string;
	userName: string;
	userFullName: string;
	dishId: string;
	dishName: string;
	dishPrice: number;
	dishAdditional: boolean;
	amount: number;
	total: number;
	note: string;
	paymentStatus: OrderStatus;
	createdAt: string;
	updatedAt: string;

	order: OrderDetail;
};

export const orderColumns = (
	currentProfileId: string
): ColumnDef<OrderRow>[] => {
	return [
		{
			accessorKey: "index",
			header: "#",
			cell: ({ row }) => {
				const index = row.index;

				return <div>{index + 1}</div>;
			},
		},
		{
			accessorKey: "userFullName",
			header: "Username",
			cell: ({ row }) => {
				const order = row.original.order;

				return (
					<div>
						{order.User.name} {currentProfileId === order.userId ? "(You)" : ""}
					</div>
				);
			},
		},
		{
			accessorKey: "dishName",
			header: "Dish name",
		},
		{
			accessorKey: "dishPrice",
			header: "Dish price",
			cell: ({ row }) => {
				const value = parseFloat(row.getValue("dishPrice"));
				const formatted = new Intl.NumberFormat().format(value);

				return <div>{formatted} VND</div>;
			},
		},
		{
			accessorKey: "amount",
			header: "Amount",
		},
		{
			accessorKey: "total",
			header: "Total sum",
			cell: ({ row }) => {
				const total = parseFloat(row.getValue("total"));
				const formatted = new Intl.NumberFormat().format(total);

				return <div>{formatted} VND</div>;
			},
		},
		{
			accessorKey: "note",
			header: "Note",
		},
		{
			accessorKey: "paymentStatus",
			header: "Payment Status",
		},
		{
			accessorKey: "createdAt",
			header: "Created At",
			cell: ({ row }) => {
				const createdAt: string = row.getValue("createdAt");
				const formatted = dayjs(new Date(createdAt)).format("DD/MM HH:mm:ss");

				return <div>{formatted}</div>;
			},
		},
		{
			accessorKey: "action",
			header: "Actions",
			cell: ({ row }) => {
				const order = row.original.order;
				const isOrderMatchWithProfile = currentProfileId === order.userId;

				return (
					<div>
						{isOrderMatchWithProfile ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0" title="More">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Actions</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<Sheet>
										<SheetTrigger asChild>
											<DropdownMenuLabel className="cursor-pointer font-normal hover:bg-accent rounded-sm">
												Edit Order
											</DropdownMenuLabel>
										</SheetTrigger>
										<UpdateOrder order={order} />
									</Sheet>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<>&nbsp;</>
						)}
					</div>
				);
			},
		},
	];
};
