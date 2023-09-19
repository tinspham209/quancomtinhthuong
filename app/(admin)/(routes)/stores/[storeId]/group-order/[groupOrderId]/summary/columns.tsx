'use client';

import { GroupOrderSummary } from '@/queries/group-orders/types';
import { formatMoney } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';

export type DishRow = {
  id: string;
  dishName: string;
  price: number;
  amount: number;
  total: number;
  users: GroupOrderSummary['orders'][0]['users'];
};

export const dishColumns: ColumnDef<DishRow>[] = [
  {
    accessorKey: 'index',
    header: '#',
    cell: ({ row }) => {
      const index = row.index;

      return <div>{index + 1}</div>;
    },
  },
  {
    accessorKey: 'dishName',
    header: 'Dish Name',
  },
  {
    accessorKey: 'price',
    header: 'Dish price',
    cell: ({ row }) => {
      const value = parseFloat(row.getValue('price'));
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
      const total = parseFloat(row.getValue('total'));
      const formatted = formatMoney(total);

      return <div>{formatted} VND</div>;
    },
  },
  {
    accessorKey: 'users',
    header: 'Order By',
    cell: ({ row }) => {
      const users = row.original.users;

      const formatUsers = () => {
        const u: string[] = [];
        users.forEach((user) => {
          u.push(user.name);
        });
        return u.join(', ');
      };

      return <div>{formatUsers()}</div>;
    },
  },
];
