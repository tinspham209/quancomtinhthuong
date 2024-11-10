'use client';
import { useGetGroupOrderDetail } from '@/queries/group-orders';
import { useParams } from 'next/navigation';
import React from 'react';
import { GroupOrderDetailDishes, GroupOrderDetailHeader } from './components';
import { useGetStoreById } from '@/queries/stores';
import { useGetSlackWebhooks } from '@/queries/slack';

interface Props {}

const GroupOrderDetail: React.FC<Props> = ({}) => {
  const params = useParams();

  const { groupOrder } = useGetGroupOrderDetail({
    groupOrderId: params.groupOrderId,
  });

  const { storeById: store } = useGetStoreById({
    storeId: groupOrder?.storeId || '',
    enabled: !!groupOrder?.storeId,
  });

  const { slackWebhooks } = useGetSlackWebhooks();

  return (
    <div className="p-4 pt-8">
      <GroupOrderDetailHeader
        order={groupOrder}
        store={store}
        slackWebhooks={slackWebhooks || []}
      />
      <GroupOrderDetailDishes order={groupOrder} />
    </div>
  );
};

export default GroupOrderDetail;
