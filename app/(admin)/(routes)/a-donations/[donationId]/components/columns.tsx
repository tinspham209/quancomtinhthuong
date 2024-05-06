'use client';

import { DonationPayment } from '@/queries/donations/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import ColumnsAction from './columnsAction';

export const donationColumns = (): ColumnDef<DonationPayment>[] => {
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
      header: 'Người ủng hộ',
      cell: ({ row }) => {
        const user: DonationPayment['User'] = row.getValue('User');

        return (
          <div>
            {user?.name || '--'} ({user?.userName})
          </div>
        );
      },
    },
    {
      accessorKey: 'donationAmount',
      header: 'Số tiền ủng hộ',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('donationAmount'));
        const formatted = new Intl.NumberFormat().format(total);

        return <div>{formatted} VND</div>;
      },
    },
    {
      accessorKey: 'comment',
      header: 'Tin nhắn',
    },
    {
      accessorKey: 'createdAt',
      header: 'Thời gian ủng hộ',
      cell: ({ row }) => {
        const createdAt: string = row.getValue('createdAt');
        const formatted = dayjs(createdAt).format('DD/MM HH:mm:ss');

        return <div>{formatted}</div>;
      },
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
