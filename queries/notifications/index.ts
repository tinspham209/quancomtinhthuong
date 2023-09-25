import { ErrorResponse } from '@/app/types';
import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import apiClient from '../apiClient';
import { responseWrapper } from '../auth/helpers';
import { Callback } from '../auth/types';
import { Notification } from './types';

export function useGetNotifications(
  options?: UseQueryOptions<Notification[], ErrorResponse> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    userName?: string;
  },
) {
  const handleGet: QueryFunction<Notification[]> = () => {
    return responseWrapper<Notification[]>(apiClient.getUserNotifications, [options?.userName]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getNotifications,
  } = useQuery<Notification[], ErrorResponse>([`/notifications`, { userName: options?.userName }], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: !!options?.userName,
    notifyOnChangeProps: ['data', 'isFetching'],
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

  const handleInvalidateNotifications = () => {
    return queryClient.invalidateQueries([`/notifications`]);
  };

  return {
    notifications: data,
    error,
    isError,
    loading: isFetching,
    getNotifications,
    handleInvalidateNotifications,
  };
}
