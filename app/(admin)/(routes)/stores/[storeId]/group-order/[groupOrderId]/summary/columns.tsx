'use client';

import { Dish } from '@/queries/dishes/types';
import { GroupOrderSummary } from '@/queries/group-orders/types';
import { formatMoney } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';

export type DishRow = {
  id: string;
  dishName: string;
  price: number;
  amount: number;
  numberOfUsers: number;
  total: number;
  users: GroupOrderSummary['orders'][0]['users'];
  additionalOrders: { id: string; amount: number; Dish: Dish }[];
};

export type AdditionalDishRow = {
  id: string;
  amount: number;
  Dish: Dish;
  user: GroupOrderSummary['orders'][0]['users'];
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
    accessorKey: 'numberOfUsers',
    header: 'Number Of Users',
  },
  {
    accessorKey: 'users',
    header: 'Order By',
    cell: ({ row }) => {
      const users = row.original.users;

      const formatUsers = () => {
        const u: string[] = [];
        users.forEach((user) => {
          u.push(`${user.name} (${user.amount})`);
        });
        return u.join(', ');
      };

      return <div>{formatUsers()}</div>;
    },
  },
];

export const additionalDishColumns: ColumnDef<AdditionalDishRow>[] = [
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
    cell: ({ row }) => {
      const name = row.original.Dish.name;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: 'price',
    header: 'Dish price',
    cell: ({ row }) => {
      const value = parseFloat(row.original.Dish.price.toString());
      const formatted = new Intl.NumberFormat().format(value);

      return <div>{formatted} VND</div>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original.user[0].name;
      return <div>{user}</div>;
    },
  },
];
