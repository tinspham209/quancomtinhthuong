'use client';

import { DonationPayment, DonationStatus } from '@/queries/donations/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import ColumnsAction from './columnsAction';
import BadgeStatus from '@/components/badge-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';

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
      accessorKey: 'donationStatus',
      header: 'Status',
      cell: ({ row }) => {
        const status = (row.getValue('donationStatus') as DonationStatus) || '';

        return (
          <div className="flex justify-center -translate-x-9">
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

        return <ColumnsAction record={record} />;
      },
    },
  ];
};
