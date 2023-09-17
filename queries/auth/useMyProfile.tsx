import {
  QueryFunction,
  QueryFunctionContext,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { Callback, MyProfile } from './types';
import apiClient from '../apiClient';
import { responseWrapper } from './helpers';

export function useProfile(
  options?: UseQueryOptions<MyProfile, Error, MyProfile> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetProfile: QueryFunction<MyProfile> = () => {
    return responseWrapper<MyProfile>(apiClient.getMyProfile);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getMyProfile,
  } = useQuery<MyProfile, Error, MyProfile>([`/profile`], {
    queryFn: handleGetProfile,
    refetchOnMount: false,
    enabled: false,
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

  const handleInvalidateProfile = () => queryClient.invalidateQueries([`/profile`]);

  return {
    profile: data,
    error,
    isError,
    loading: isFetching,
    getMyProfile,
    handleInvalidateProfile,
  };
}
