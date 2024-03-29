'use client';

import BadgeStatus from '@/components/badge-status';
import { DeleteOrder, UpdateOrder } from '@/components/sheet';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import MyTooltip from '@/components/ui/my-tooltip';
import { GroupOrderDetail } from '@/queries/group-orders/types';
import { OrderDetail, OrderStatus } from '@/queries/orders/types';
import { formatMoney } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';
import { getNote } from '@/app/order/[storeSlug]/group-order/[groupOrderId]/orders/components/columns';
import '@/app/order/[storeSlug]/group-order/[groupOrderId]/orders/components/styles.css';

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
  additionalPrice: number;
  additionalNote: string;
  paymentStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;

  order: OrderDetail;
};

export const orderColumns = ({
  groupOrder,
}: {
  groupOrder: GroupOrderDetail | undefined;
}): ColumnDef<OrderRow>[] => [
  {
    accessorKey: 'index',
    header: '#',
    cell: ({ row }) => {
      const index = row.index;

      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: 'userFullName',
    header: 'User Name',
  },
  {
    accessorKey: 'dishName',
    header: 'Dish name',
    cell: ({ row }) => {
      const value: string = row.getValue('dishName');
      return <div className="max-w-[200px]">{value}</div>;
    },
  },
  {
    accessorKey: 'note',
    header: 'User Note',
    cell: ({ row }) => {
      const value: string = row.getValue('note');
      return <div className="max-w-[200px]">{value}</div>;
    },
  },
  {
    accessorKey: 'dishPrice',
    header: 'Dish price',
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('dishPrice'));
      const formatted = new Intl.NumberFormat().format(value);

      return <div>{formatted} VND</div>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },

  {
    accessorKey: 'additionalNote',
    header: 'Additional dishes',
    cell: ({ row }) => {
      const order = row.original.order;
      const additionalOrdersLength = order.AdditionalOrders.length;
      if (additionalOrdersLength > 0) {
        return (
          <div className="max-w-[300px]">
            <MyTooltip title={getNote(order)}>
              <p className="additional-notes">
                {additionalOrdersLength} {additionalOrdersLength === 1 ? 'item' : 'items'}
              </p>
            </MyTooltip>
            {order.additionalNote}
          </div>
        );
      }
      return <div className="max-w-[300px]">{order.additionalNote}</div>;
    },
  },
  {
    accessorKey: 'additionalPrice',
    header: 'Additional Price',
    cell: ({ row }) => {
      const order = row.original.order;
      return <div className="max-w-[300px]">{formatMoney(order.additionalPrice)} VND</div>;
    },
  },
  {
    accessorKey: 'total',
    header: 'Total sum',
    cell: ({ row }) => {
      const total = parseFloat(row.getValue('total'));
      const formatted = new Intl.NumberFormat().format(total);

      return <div>{formatted} VND</div>;
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      const order = row.original.order;

      const status = (order.status as OrderStatus) || '';

      return (
        <div className="flex justify-center -translate-x-6">
          <BadgeStatus status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt: string = row.getValue('createdAt');
      const formatted = dayjs(new Date(createdAt)).format('DD/MM HH:mm:ss');

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'action',
    header: 'Actions',
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

              {/* Edit */}
              <Sheet>
                <SheetTrigger asChild>
                  <DropdownMenuLabel className="cursor-pointer font-normal hover:bg-accent rounded-sm">
                    Edit Order
                  </DropdownMenuLabel>
                </SheetTrigger>
                <UpdateOrder
                  isOwner={true}
                  order={order}
                  restaurantId={groupOrder?.restaurantId || ''}
                />
              </Sheet>

              {/* Delete */}
              <Sheet>
                <SheetTrigger asChild>
                  <DropdownMenuLabel className="cursor-pointer font-normal text-red-500 hover:bg-accent rounded-sm">
                    Delete Order
                  </DropdownMenuLabel>
                </SheetTrigger>
                <DeleteOrder order={order} isShowUserName />
              </Sheet>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
