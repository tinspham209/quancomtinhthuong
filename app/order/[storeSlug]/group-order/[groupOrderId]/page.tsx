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
import { GlobalClasses, getGlobalClasses } from '@/services/theme/global-class.config';

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

  const themesList: Array<ThemeConfig> = [
    {
      common: {
        bgColor: '#000',
        color: '#fff',
        primaryBtnBgColor: '#fff',
        primaryBtnColor: '#000',
      },
      card: {
        bgColor: '#000',
        color: '#fff',
      },
    },
    {
      common: {
        bgColor: '#fff',
        color: '#000',
        primaryBtnBgColor: '#000',
        primaryBtnColor: '#fff',
      },
      card: {
        bgColor: '#fff',
        color: '#000',
      },
    },
    {
      common: {
        bgColor: '#003064',
        color: '#fff',
        primaryBtnBgColor: '#123',
        primaryBtnColor: '#fff',
      },
      card: {
        bgColor: '#fff',
        color: '#000',
      },
    },
  ];

  const { theme, setLocalTheme } = useContext(ThemeContext);

  const globalClasses = getGlobalClasses(theme);

  const updateTheme = (theme: ThemeConfig) => {
    setLocalTheme(theme);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 my-4">
        {themesList.map((theme, index) => {
          return (
            <div key={index}>
              <Button
                onClick={() => updateTheme(theme)}
                className={`${globalClasses.common.primaryBtnBgColor} ${globalClasses.common.primaryBtnColor} `}
              >
                Theme {index}
              </Button>
            </div>
          );
        })}
      </div>
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
