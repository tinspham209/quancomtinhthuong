'use client';

import { OrdersHistoryDetail } from '@/queries/ordersHistory/type';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import ColumnsAction from './columnsAction';
import { DonationPayment, DonationStatus } from '@/queries/donations/types';
import BadgeStatus from '@/components/badge-status';

export const donationColumns = (): ColumnDef<any>[] => {
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
      accessorKey: 'donationTitle',
      header: 'Group Donation',
    },
    // {
    //   accessorKey: 'storeTitle',
    //   header: 'Store',
    // },
    {
      accessorKey: 'donationAmount',
      header: 'Amount',
      cell: ({ row }) => {
        const total = parseFloat(row.getValue('donationAmount'));
        const formatted = new Intl.NumberFormat().format(total);

        return <div>{formatted} VND</div>;
      },
    },
    {
      accessorKey: 'donationStatus',
      header: 'Status',
      cell: ({ row }) => {
        const status = (row.getValue('donationStatus') as DonationStatus) || '';

        return (
          <div className="flex justify-center -translate-x-4">
            <BadgeStatus status={status as any} isShowAnimation />
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: 'Actions',
      cell: ({ row }) => {
        const record = row.original;
        const donationPayment = {
          comment: '',
          createdAt: record.createdAt,
          donationAmount: record.donationAmount || 0,
          donationLink: record.donationLink,
          donationStatus: record.donationStatus,
          updatedAt: record.createdAt,
          id: record.id,
        };

        return <ColumnsAction record={donationPayment as any} />;
      },
    },
  ];
};
