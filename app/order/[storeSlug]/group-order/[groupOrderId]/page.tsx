'use client';

import { useGetDishesByRestaurantId } from '@/queries/dishes';
import { useGetGroupOrderDetail } from '@/queries/group-orders';
import { useGetStoreBySlug } from '@/queries/stores';
import { useParams } from 'next/navigation';
import React from 'react';
import { OrderDishesCtn, OrderHeader } from './components';
import AnimationOrderHeader from './components/animation';

interface Props {}

const OrderCtn: React.FC<Props> = ({}) => {
  const { storeSlug, groupOrderId } = useParams();
  const { groupOrder } = useGetGroupOrderDetail({
    groupOrderId: groupOrderId,
  });
  const { dishes } = useGetDishesByRestaurantId({
    restaurantId: groupOrder?.restaurantId,
  });

  const { store } = useGetStoreBySlug({
    slug: storeSlug,
  });

  return (
    <div className="p-4 pt-8 relative">
      <AnimationOrderHeader />
      <OrderHeader order={groupOrder} />
      <OrderDishesCtn
        dishes={dishes}
        storeId={store?.id || ''}
        groupOrderId={groupOrderId}
        isFinalized={groupOrder?.finalized || false}
      />
    </div>
  );
};

export default OrderCtn;
