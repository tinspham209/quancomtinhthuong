import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { responseWrapper } from '../auth/helpers';
import { Callback } from '../auth/types';
import apiClient from '../apiClient';
import { OrdersHistoryDetail, GetUserOrdersHistoryParams } from './type';

const mock = [
  {
    discount: 2000,
    finalized: true,
    imgUrl: '',
    title: '',
    dueTime: '',
    groupOrderId: 'some id',
    Store: {
      name: 'dong-ky-order',
      storeSlug: '',
    },
    Orders: [
      {
        amount: 1,
        status: 'NOPE',
        paymentLink: 'https://pay.payos.vn/web/2938d394f24042eaaf0caf960c1cfd41',
        Dish: {
          name: 'Bún mắm thập cẩm',
          price: 25000,
          imgUrl:
            'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/VNITE2019073104420254902/detail/c6b2415736254626a5a4985ae29a5cf8_1565061693539940630.webp',
          category: 'Menu',
        },
        AdditionalOrders: [
          {
            amount: 1,
            Dish: {
              name: 'Chả - 1 cái',
              price: 5000,
              imgUrl:
                'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/5-CYUUNAXGBAWCRE-CYUUNAXHC3KXVA/detail/a03c20be947d4d928b285419b3608cf3_1563160287198667596.webp',
              category: 'Menu',
            },
          },
          {
            amount: 1,
            Dish: {
              name: 'Chả - 1 cái',
              price: 5000,
              imgUrl:
                'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/items/5-CYUUNAXGBAWCRE-CYUUNAXHC3KXVA/detail/a03c20be947d4d928b285419b3608cf3_1563160287198667596.webp',
              category: 'Menu',
            },
          },
        ],
      },
    ],
    total: 83000,
  },
];

export function useGetOrdersHistory(
  params: GetUserOrdersHistoryParams,
  options?: UseQueryOptions<OrdersHistoryDetail[], ErrorResponse> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGet: QueryFunction<OrdersHistoryDetail[]> = () => {
    return responseWrapper<OrdersHistoryDetail[]>(apiClient.getUserOrdersHistory, [params]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getOrdersHistory,
  } = useQuery<OrdersHistoryDetail[], ErrorResponse>([`/user/history`], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: false,
    notifyOnChangeProps: ['data', 'isFetching'],
    staleTime: 10000,
    refetchOnWindowFocus: true,
    select: (data) => data,
    ...options,
  });

  useEffect(() => {
    if (data && isSuccess) {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (options?.onErrorCallback) {
        options.onErrorCallback(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const queryClient = useQueryClient();

  const handleInvalidateOrdersHistory = () => {
    return queryClient.invalidateQueries([`/user/history`]);
  };

  return {
    ordersHistory: data,
    error,
    isError,
    loading: isFetching,
    getOrdersHistory,
    handleInvalidateOrdersHistory,
  };
}
