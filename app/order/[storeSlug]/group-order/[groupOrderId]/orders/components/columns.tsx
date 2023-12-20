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

export const getNote = (order: OrderDetail) => {
  return (
    <>
      <ul className="list-decimal pr-4 pl-4">
        {order.AdditionalOrders.map((o) => (
          <li key={o.Dish.id}>
            Name: {o.Dish.name}, amount: {o.amount}, price: {o.Dish.price}
          </li>
        ))}
      </ul>
      {order.additionalNote && (
        <p className="italic font-normal">
          *Note: {order.additionalNote}, price: {order.additionalPrice}
        </p>
      )}
    </>
  );
};

export const orderColumns = ({
  currentProfileId,
  groupOrder,
}: {
  currentProfileId: string;
  groupOrder: GroupOrderDetail | undefined;
}): ColumnDef<OrderRow>[] => {
  return [
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
      cell: ({ row }) => {
        const order = row.original.order;

        return (
          <div>
            {order.User.name} {currentProfileId === order.userId ? '(You)' : ''}
          </div>
        );
      },
    },
    {
      accessorKey: 'dishName',
      header: 'Dish name',
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
      accessorKey: 'total',
      header: 'Total sum',
      cell: ({ row }) => {
        const order = row.original.order;
        const additionalOrdersSum = order.AdditionalOrders.reduce((curr, next) => {
          const amount = next.amount;
          const price = next.Dish.price;

          return curr + amount * price;
        }, 0);
        const total = parseFloat(row.getValue('total')) + additionalOrdersSum;
        const formatted = new Intl.NumberFormat().format(total);

        return <div>{formatted} VND</div>;
      },
    },
    {
      accessorKey: 'note',
      header: 'Note',
      cell: ({ row }) => {
        const order = row.original.order;

        return <div className="max-w-[300px]">{order.note}</div>;
      },
    },
    {
      accessorKey: 'additionalPrice',
      header: 'Additional Price',
      cell: ({ row }) => {
        const order = row.original.order;
        const sum = order.AdditionalOrders.reduce((curr, next) => {
          const amount = next.amount;
          const price = next.Dish.price;

          return curr + amount * price;
        }, 0);

        return <div className="max-w-[300px]">{formatMoney(sum)} VND</div>;
      },
    },
    {
      accessorKey: 'additionalNote',
      header: '* Note',
      cell: ({ row }) => {
        const order = row.original.order;
        const additionalOrdersLength = order.AdditionalOrders.length;
        if (additionalOrdersLength > 0) {
          return (
            <div className="max-w-[300px]">
              <MyTooltip advancedTitle={getNote(order)}>
                <p className="additional-notes">
                  {additionalOrdersLength} {additionalOrdersLength === 1 ? 'item' : 'items'}
                </p>
              </MyTooltip>
            </div>
          );
        }

        return <div className="max-w-[300px]">{order.additionalNote}</div>;
      },
    },
    {
      accessorKey: 'paymentStatus',
      header: 'Payment Status',
      cell: ({ row }) => {
        const order = row.original.order;
        const isOrderMatchWithProfile = currentProfileId === order.userId;

        const status = (order.status as OrderStatus) || '';

        return (
          <div className="flex justify-center -translate-x-6">
            <BadgeStatus status={status} isShowAnimation={isOrderMatchWithProfile} />
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
        const allowModifyOrder = !!groupOrder && !groupOrder?.finalized;
        const isOrderMatchWithProfile = currentProfileId === order.userId;

        return (
          <div>
            {allowModifyOrder && isOrderMatchWithProfile ? (
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
                    <UpdateOrder order={order} restaurantId={groupOrder.restaurantId} />
                  </Sheet>

                  {/* Delete */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <DropdownMenuLabel className="cursor-pointer font-normal text-red-500 hover:bg-accent rounded-sm">
                        Delete Order
                      </DropdownMenuLabel>
                    </SheetTrigger>
                    <DeleteOrder order={order} />
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
