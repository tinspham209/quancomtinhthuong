'use client';

import { OrderHistoryRow, orderHistoryColumns } from '@/app/history-orders/components/columns';
import { DataTable, Heading } from '@/components/ui';
import { useProfileStore } from '@/hooks';
import { OrderStatus } from '@/queries/orders/types';
import { useGetOrdersHistory } from '@/queries/ordersHistory';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { profile } = useProfileStore();

  const { ordersHistory, getOrdersHistory } = useGetOrdersHistory({
    from: dayjs().subtract(15, 'days').format('MM/DD/YYYY'),
    to: dayjs().format('MM/DD/YYYY'),
    userId: profile?.id || '',
    status: OrderStatus.PAID,
  });

  useEffect(() => {
    if (profile) {
      getOrdersHistory();
    }
  }, [profile]);

  const formattedOrdersHistory = useMemo(() => {
    if (!ordersHistory) return [];

    const formattedOrders: OrderHistoryRow[] = ordersHistory.map((order) => ({
      storeTitle: order.Store.name,
      groupOrderTitle: order.title,
      discount: order.discount,
      total: order.total,
      paymentStatus: order.status,
      createdAt: order.createdAt,
      order: order,
    }));

    return formattedOrders;
  }, [ordersHistory]);

  const allColumns = useMemo(() => orderHistoryColumns(), []);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row md:justify-between">
        <Heading title="Orders History" />
        <div className="mt-2 sm:mt-0"></div>
      </div>

      <div className="my-6">
        <DataTable columns={allColumns} data={formattedOrdersHistory} />
      </div>
    </div>
  );
};
export default Client;
