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

export const orderColumns: ColumnDef<OrderRow>[] = [
	{
		accessorKey: "userFullName",
		header: "Username",
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
		accessorKey: "action",
		header: "Actions",
		cell: ({ row }) => {
			const order = row.original.order;

			return (
				<div>
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
				</div>
			);
		},
	},
];
