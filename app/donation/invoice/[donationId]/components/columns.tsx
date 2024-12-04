'use client';

import { DonationPayment, DonationStatus } from '@/queries/donations/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import ColumnsAction from './columnsAction';
import BadgeStatus from '@/components/badge-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Invoice } from '@/queries/invoices/types';

export const invoiceColumns = (): ColumnDef<Invoice>[] => {
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
      accessorKey: 'User',
      header: 'Người chi',
      cell: ({ row }) => {
        const user: DonationPayment['User'] = row.getValue('User');

        return (
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.imgUrl} alt={`${user?.name}`} title={user?.name} />
              <AvatarFallback title={user?.name}>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user?.name || '--'} ({user?.userName || '--'})
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Số tiền chi',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat().format(total);

        return <div>{formatted} VND</div>;
      },
    },
    {
      accessorKey: 'title',
      header: 'Chi cho',
    },
    {
      accessorKey: 'description',
      header: 'Chi tiết',
    },
    {
      accessorKey: 'action',
      header: 'Actions',

      cell: ({ row }) => {
        const record = row.original;

        return <ColumnsAction record={record} />;
      },
    },
  ];
};
