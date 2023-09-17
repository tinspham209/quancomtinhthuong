'use client';

import { CreateStorePayload, CreateStoreResponse, UpdateStorePayload } from '@/lib/validators';
import {
  QueryFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import apiClient from '../apiClient';
import { responseWrapper } from '../auth/helpers';
import { Callback, Store } from '../auth/types';

export function useGetStoresByUserName(
  options?: UseQueryOptions<Store[], Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    userName?: string;
  },
) {
  const handleGet: QueryFunction<Store[]> = () => {
    return responseWrapper<Store[]>(apiClient.getStoresByUserName, [options?.userName]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getStoresByUserName,
  } = useQuery<Store[], Error>([`/store/stores`, { userName: options?.userName }], {
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

  const handleInvalidateStoresByUserName = () => {
    queryClient.invalidateQueries([`/store/stores`]);
  };

  return {
    storesByUserName: data,
    error,
    isError,
    loading: isFetching,
    getStoresByUserName,
    handleInvalidateStoresByUserName,
  };
}

export function useCreateStore(
  options?: UseMutationOptions<CreateStoreResponse, Error, CreateStorePayload>,
) {
  const { mutate: createStore, isLoading } = useMutation<
    CreateStoreResponse,
    Error,
    CreateStorePayload
  >({
    mutationFn: async (payload: CreateStorePayload) => {
      return responseWrapper(apiClient.createStore, [payload]);
    },
    ...options,
  });

  return {
    createStore,
    isLoading,
  };
}

export function useDeleteStore(options?: UseMutationOptions<any, Error, { storeId: string }>) {
  const { mutate: deleteStore, isLoading } = useMutation<any, Error, { storeId: string }>({
    mutationFn: async (payload: { storeId: string }) => {
      return responseWrapper(apiClient.deleteStore, [payload.storeId]);
    },
    ...options,
  });

  return {
    deleteStore,
    isLoading,
  };
}

export function useGetStoreById(
  options?: UseQueryOptions<Store, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    storeId: string;
  },
) {
  const handleGet: QueryFunction<Store> = () => {
    return responseWrapper<Store>(apiClient.getStoreById, [options?.storeId]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getStoreById,
  } = useQuery<Store, Error>([`/store`, { storeId: options?.storeId }], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: !!options?.storeId,
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

  const handleInvalidateStoreById = () => queryClient.invalidateQueries([`/store`]);

  return {
    storeById: data,
    error,
    isError,
    loading: isFetching,
    getStoreById,
    handleInvalidateStoreById,
  };
}

export function useGetStoreBySlug(
  options?: UseQueryOptions<Store, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    slug: string;
  },
) {
  const handleGet: QueryFunction<Store> = () => {
    return responseWrapper<Store>(apiClient.getStoreBySlugName, [options?.slug]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getStoreBySlugName,
  } = useQuery<Store, Error>([`/store/slug`, { slug: options?.slug }], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: !!options?.slug,
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

  const handleInvalidateStoreBySlug = () => queryClient.invalidateQueries([`/store/slug`]);

  return {
    store: data,
    error,
    isError,
    loading: isFetching,
    getStoreBySlugName,
    handleInvalidateStoreBySlug,
  };
}

export function useUpdateStore(options?: UseMutationOptions<Store, Error, UpdateStorePayload>) {
  const { mutate: updateStore, isLoading } = useMutation<Store, Error, UpdateStorePayload>({
    mutationFn: async (payload: UpdateStorePayload) => {
      return responseWrapper(apiClient.updateStore, [payload]);
    },
    ...options,
  });

  return {
    updateStore,
    isLoading,
  };
}
