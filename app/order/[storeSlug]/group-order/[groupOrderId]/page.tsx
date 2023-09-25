'use client';

import { Button } from '@/components/ui';
import { ThemeContext } from '@/providers/theme-provider';
import { useGetDishesByRestaurantId } from '@/queries/dishes';
import { useGetGroupOrderDetail } from '@/queries/group-orders';
import { useGetStoreBySlug } from '@/queries/stores';
import { ThemeConfig } from '@/services/theme';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import { OrderDishesCtn, OrderHeader } from './components';

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
    <div className="p-4 pt-8">
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
