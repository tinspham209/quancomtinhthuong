'use client';

import { DataTable } from '@/components/ui';
import { useGetGroupOrderDetail } from '@/queries/group-orders';
import { useGetOrdersByGroupOrderId } from '@/queries/orders';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { OrderRow, orderColumns } from './components/columns';
import OrdersHeader from './components/group-order-header';
import { useProfileStore } from '@/hooks';
import NoSsr from '@/components/no-ssr';

interface Props {}

const OrdersOfGroupOrders: React.FC<Props> = ({}) => {
  const { groupOrderId, storeSlug } = useParams();

  const { orders: ordersList } = useGetOrdersByGroupOrderId({
    groupOrderId: groupOrderId,
  });

  const { groupOrder } = useGetGroupOrderDetail({
    groupOrderId: groupOrderId,
  });

  const formattedOrders = useMemo(() => {
    if (!ordersList) return [];
    const orders: OrderRow[] = ordersList.map((order) => {
      return {
        id: order.id,
        groupOrderId: order.groupOrderId,
        userId: order.userId,
        userName: order.User.userName,
        userFullName: order.User.name,
        dishId: order.dishId,
        dishName: order.Dish.name,
        dishPrice: order.Dish.price,
        dishAdditional: order.Dish.additional,
        amount: order.amount,
        total: order.Dish.price * order.amount,
        note: order.note,
        additionalPrice: order.additionalPrice,
        additionalNote: order.additionalNote,
        paymentStatus: order.status,

        createdAt: order.createdAt,
        updatedAt: order.updatedAt,

        order: order,
      };
    });
    return orders;
  }, [ordersList]);

  const { profile } = useProfileStore();

  const allColumns = useMemo(
    () => orderColumns({ currentProfileId: profile?.id || '', groupOrder: groupOrder }),
    [profile, groupOrder],
  );

  return (
    <div className="p-4 pt-8">
      <NoSsr>
        <OrdersHeader groupOrder={groupOrder} />

        <div className="my-6">
          <DataTable columns={allColumns} data={formattedOrders} />
        </div>
      </NoSsr>
    </div>
  );
};

export default OrdersOfGroupOrders;
