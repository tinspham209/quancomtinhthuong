'use client';

import { DataTable } from '@/components/ui';
import { useGetGroupOrderSummary } from '@/queries/group-orders';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { DishRow, dishColumns } from './columns';
import SummaryHeader from './summary-header';
import { formatMoney } from '@/utils';
import toast from 'react-hot-toast';

interface Props {}

const OrdersOfGroupOrders: React.FC<Props> = ({}) => {
  const { groupOrderId, storeId } = useParams();

  const { groupOrderSummary } = useGetGroupOrderSummary({
    groupOrderId: groupOrderId,
  });

  const formattedOrders = useMemo(() => {
    if (!groupOrderSummary) return [];
    const orders: DishRow[] = groupOrderSummary.orders.map((order) => {
      return {
        id: order.id,
        dishName: order.name,
        price: order.price,
        amount: order.amount,
        numberOfUsers: order.usersLength,
        total: order.price * order.amount,
        users: order.users,
      };
    });

    return orders;
  }, [groupOrderSummary]);

  const total: {
    amount: number;
    orders: number;
    price: number;
    discount: number;
    users: number;
  } = useMemo(() => {
    let amount = 0,
      orders = 0,
      price = 0,
      discount = 0,
      users = 0;
    if (!groupOrderSummary)
      return {
        amount,
        orders,
        price,
        discount,
        users,
      };

    amount = formattedOrders.reduce((acc, order) => {
      return acc + order.amount;
    }, 0);
    orders = formattedOrders.length;
    price = groupOrderSummary.totalPrice;
    discount = groupOrderSummary.discount;
    users = formattedOrders.reduce((acc, order) => {
      return acc + order.users.length;
    }, 0);
    return {
      amount,
      orders,
      price,
      discount,
      users,
    };
  }, [formattedOrders, groupOrderSummary]);

  const allColumns = useMemo(() => dishColumns, []);

  const router = useRouter();

  useEffect(() => {
    if (groupOrderSummary && !groupOrderSummary.finalized) {
      toast.error('This group order is not finalized yet!');
      router.push(`/stores/${storeId}/group-order/${groupOrderId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupOrderSummary]);

  return (
    <div className="p-4 pt-8">
      <SummaryHeader summary={groupOrderSummary} />

      <div className="my-6">
        <div className="mb-3">
          <h2 className="text-2xl font-bold leading-none tracking-tight mb-1">
            Total Dishes: {total.orders} - Total Amount: {total.amount} - Total Users: {total.users}{' '}
            - Total Price: {formatMoney(total.price || 0)} VND - Discount:{' '}
            {formatMoney(total.discount || 0)} VND
          </h2>
        </div>
        <DataTable columns={allColumns} data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersOfGroupOrders;
