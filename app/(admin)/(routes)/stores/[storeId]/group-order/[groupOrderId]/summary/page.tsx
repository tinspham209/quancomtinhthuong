'use client';

import { DataTable } from '@/components/ui';
import { useGetGroupOrderSummary } from '@/queries/group-orders';
import { formatMoney } from '@/utils';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { AdditionalDishRow, DishRow, additionalDishColumns, dishColumns } from './columns';
import SummaryHeader from './summary-header';

interface Props {}

const OrdersOfGroupOrders: React.FC<Props> = ({}) => {
  const { groupOrderId } = useParams();

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
        additionalOrders: order.users[0].additionalOrders || [],
      };
    });

    return orders;
  }, [groupOrderSummary]);

  const formattedAdditionalOrders = useMemo(() => {
    if (!groupOrderSummary) return [];
    const result: AdditionalDishRow[] = [];
    groupOrderSummary.orders.forEach((order) => {
      order.users[0].additionalOrders.forEach((additionalOrder) => {
        result.push({
          ...additionalOrder,
          user: order.users,
        });
      });
    });

    return result;
  }, [groupOrderSummary]);

  const additionalTotal: {
    additionalOrders: number;
    additionalAmount: number;
    additionalPrice: number;
  } = useMemo(() => {
    let additionalOrders = 0,
      additionalAmount = 0,
      additionalPrice = 0;
    if (!groupOrderSummary)
      return {
        additionalOrders,
        additionalAmount,
        additionalPrice,
      };

    additionalOrders = formattedOrders.reduce((acc, order) => {
      return acc + order.additionalOrders.length;
    }, 0);

    additionalAmount = formattedOrders.reduce((acc, order) => {
      return acc + order.additionalOrders.reduce((c, n) => c + n.amount, 0);
    }, 0);

    additionalPrice = formattedOrders.reduce((acc, order) => {
      return acc + order.additionalOrders.reduce((c, n) => c + n.Dish.price, 0);
    }, 0);

    return {
      additionalOrders,
      additionalAmount,
      additionalPrice,
    };
  }, [formattedOrders, groupOrderSummary]);

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
  const allAdditionalColumns = useMemo(() => additionalDishColumns, []);

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

      {additionalTotal.additionalOrders > 0 && (
        <div className="my-6">
          <div className="mb-3">
            <h2 className="text-2xl font-bold leading-none tracking-tight mb-1">
              Total Additional Dishes: {additionalTotal.additionalOrders} - Total Amount:{' '}
              {additionalTotal.additionalAmount} - Total Price:{' '}
              {formatMoney(additionalTotal.additionalPrice || 0)} VND
            </h2>
          </div>
          <DataTable columns={allAdditionalColumns} data={formattedAdditionalOrders} />
        </div>
      )}
    </div>
  );
};

export default OrdersOfGroupOrders;
