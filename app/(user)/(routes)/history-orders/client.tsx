'use client';

import { OrderHistoryRow, orderHistoryColumns } from '@/app/history-orders/components/columns';
import { donationColumns } from '@/app/history-orders/components/donationColumns';
import {
  DataTable,
  Heading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useProfileStore } from '@/hooks';
import { OrderStatus } from '@/queries/orders/types';
import { useGetOrdersHistory } from '@/queries/ordersHistory';
import { HistoryType, OrdersHistoryDetail } from '@/queries/ordersHistory/type';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const ALL_ORDER_STATUS_OPTION_VALUE = 'ALL';
const DAY_FROM_NOW_DEFAULT = 15;
enum OrderHistoryParams {
  PAYMENT_STATUS = 'paymentStatus',
}
type AllOrderStatusType = 'ALL';
type OrderStatusOptionValueType = OrderStatus | AllOrderStatusType;

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { profile } = useProfileStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const paymentStatusParam =
    (searchParams.get(OrderHistoryParams.PAYMENT_STATUS) as OrderStatusOptionValueType) ??
    ALL_ORDER_STATUS_OPTION_VALUE;
  const [paymentStatus, setPaymentStatus] = useState<OrderStatusOptionValueType>(
    () => paymentStatusParam,
  );

  const { ordersHistory, getOrdersHistory } = useGetOrdersHistory({
    from: dayjs().subtract(DAY_FROM_NOW_DEFAULT, 'days').format('MM/DD/YYYY'),
    to: dayjs().format('MM/DD/YYYY'),
    userId: profile?.id || '',
    status: paymentStatusParam === ALL_ORDER_STATUS_OPTION_VALUE ? undefined : paymentStatusParam,
    historyType: HistoryType.ORDER,
  });

  const { ordersHistory: donationHistory, getOrdersHistory: getDonationHistory } =
    useGetOrdersHistory({
      from: dayjs().subtract(DAY_FROM_NOW_DEFAULT, 'days').format('MM/DD/YYYY'),
      to: dayjs().format('MM/DD/YYYY'),
      userId: profile?.id || '',
      status: paymentStatusParam === ALL_ORDER_STATUS_OPTION_VALUE ? undefined : paymentStatusParam,
      historyType: HistoryType.DONATION,
    });

  useEffect(() => {
    if (profile) {
      getOrdersHistory();
      setTimeout(() => {
        getDonationHistory();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, paymentStatusParam]);

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

  const formattedDonationHistory = useMemo(() => {
    if (!donationHistory) return [];

    const formattedOrders = donationHistory.map((order) => ({
      storeTitle: order?.DonationItem?.Store?.name || '',
      donationTitle: order?.DonationItem?.title || '',
      donationAmount: order?.donationAmount || 0,
      donationLink: order?.donationLink || '',
      donationStatus: order?.donationStatus || '',
      createdAt: order.createdAt,
      id: order.id,
    }));

    return formattedOrders;
  }, [donationHistory]);

  const allColumns = useMemo(() => orderHistoryColumns(), []);

  const donationAllColumns = useMemo(() => donationColumns(), []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as any);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChangePaymentStatus = useCallback(
    (value: OrderStatusOptionValueType) => {
      setPaymentStatus(value);

      router.push(pathname + '?' + createQueryString(OrderHistoryParams.PAYMENT_STATUS, value));
    },
    [router, pathname, createQueryString, setPaymentStatus],
  );

  return (
    <div className="p-4 pt-8">
      <div className="pt-8">
        <div className="flex flex-col sm:flex-row md:justify-between">
          <Heading title="Orders History" />
          <div className="mt-2 sm:mt-0">
            <div>
              <p className="font-light mb-2 text-sm">Payment Status</p>
              <Select
                onValueChange={(value: OrderStatus | AllOrderStatusType) =>
                  handleChangePaymentStatus(value)
                }
                value={paymentStatus}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_ORDER_STATUS_OPTION_VALUE}>ALL</SelectItem>
                  <SelectItem value={OrderStatus.NOPE}>NOPE</SelectItem>
                  <SelectItem value={OrderStatus.PAID}>PAID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="my-6">
          <DataTable columns={allColumns} data={formattedOrdersHistory} />
        </div>
      </div>

      <div className="pt-8">
        <div className="flex flex-col sm:flex-row md:justify-between">
          <Heading title="Donation History" />
        </div>

        <div className="my-6">
          <DataTable columns={donationAllColumns} data={formattedDonationHistory || []} />
        </div>
      </div>
    </div>
  );
};
export default Client;
