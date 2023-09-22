'use client';

import BadgeStatus from '@/components/badge-status';
import { ViewOrder } from '@/components/sheet';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { OrderStatus } from '@/queries/orders/types';
import { OrdersHistoryDetail } from '@/queries/ordersHistory/type';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export type OrderHistoryRow = {
  storeTitle: string;
  groupOrderTitle: string;
  discount: number;
  total: number;
  paymentStatus: OrderStatus;
  createdAt: string;
  order: OrdersHistoryDetail;
};

export const orderHistoryColumns = (): ColumnDef<OrderHistoryRow>[] => {
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
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        const createdAt: string = row.getValue('createdAt');
        const formatted = dayjs(createdAt).format('DD/MM HH:mm:ss');

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: 'storeTitle',
      header: 'Store',
    },
    {
      accessorKey: 'groupOrderTitle',
      header: 'Group Order',
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('discount'));
        const formatted = new Intl.NumberFormat().format(total);

        return <div>{formatted} VND</div>;
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
        const status = (row.getValue('paymentStatus') as OrderStatus) || '';

        return <BadgeStatus status={status}/>;
        
      },
    },
    {
      accessorKey: 'action',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original.order;
        const showPaymentLink = order.status === OrderStatus.NOPE && !!order.paymentLink;

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
                      View Detail
                    </DropdownMenuLabel>
                  </SheetTrigger>
                  <ViewOrder order={order} />
                </Sheet>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href={`/order/${order.Store.storeSlug}/group-order/${order.id}/orders?viewOnlyMe=true`}
                    target="_blank"
                  >
                    Go to Orders <ExternalLink className="w-4 h-4 ml-2 mb-1" />
                  </Link>
                </DropdownMenuItem>
                {showPaymentLink && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={`${order.paymentLink}`} target="_blank">
                      Payment <ExternalLink className="w-4 h-4 ml-2 mb-1" />
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
