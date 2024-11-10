'use client';

import {
  QueryFunction,
  UseQueryOptions,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { useEffect } from 'react';
import apiClient from '../apiClient';
import { responseWrapper } from '../auth/helpers';
import { Callback } from '../auth/types';
import { useFetchCache } from '../cache';
import { SlackWebhook } from './types';

export function useGetSlackWebhooks(
  options?: UseQueryOptions<SlackWebhook[], Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGet: QueryFunction<SlackWebhook[]> = () => {
    return responseWrapper<SlackWebhook[]>(apiClient.getSlackWebhooks);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getSlackWebhooks,
  } = useQuery<SlackWebhook[], Error>([`/slack-webhooks`], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: true,
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

  const { fetchCache } = useFetchCache();
  const handleInvalidateWebhooks = () => {
    fetchCache();
    queryClient.invalidateQueries([`/slack-webhooks`]);
  };

  return {
    slackWebhooks: data || [],
    error,
    isError,
    loading: isFetching,
    getSlackWebhooks,
    handleInvalidateRestaurants: handleInvalidateWebhooks,
  };
}
