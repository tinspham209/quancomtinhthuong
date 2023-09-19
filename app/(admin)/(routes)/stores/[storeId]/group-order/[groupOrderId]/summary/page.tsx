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
        amount: order.usersLength,
        total: order.price * order.usersLength,
        users: order.users,
      };
    });

    return orders;
  }, [groupOrderSummary]);

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
    <div className="p-4">
      <SummaryHeader summary={groupOrderSummary} />

      <div className="my-6">
        <div className="mb-3">
          <h2 className="text-2xl font-bold leading-none tracking-tight mb-1">
            Total Order: {groupOrderSummary?._count.Orders} - Total Price:{' '}
            {formatMoney(groupOrderSummary?.totalPrice || 0)} VND - Discount:{' '}
            {formatMoney(groupOrderSummary?.discount || 0)} VND
          </h2>
        </div>
        <DataTable columns={allColumns} data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersOfGroupOrders;
