import {
  CreateGroupOrderPayload,
  FinalizedGroupOrderPayload,
  UpdateGroupOrderPayload,
} from '@/lib/validators/group-orders';
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
import { Callback } from '../auth/types';
import {
  GroupOrder,
  GroupOrderDetail,
  GroupOrderList,
  GroupOrderSummary,
  TriggerFinalizedGroupOrderPayload,
} from './types';

export function useGetGroupOrdersListByStoreId(
  options?: UseQueryOptions<GroupOrderList, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    storeId?: string;
  },
) {
  const handleGet: QueryFunction<GroupOrderList> = () => {
    return responseWrapper<GroupOrderList>(apiClient.getGroupOrdersListByStoreId, [
      options?.storeId,
    ]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getGroupOrderList,
  } = useQuery<GroupOrderList, Error>([`/group-order/list`], {
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

  const handleInvalidateGroupList = () => {
    queryClient.invalidateQueries([`/group-order/list`]);
  };

  return {
    groupLists: data,
    error,
    isError,
    loading: isFetching,
    getGroupOrderList,
    handleInvalidateGroupList,
  };
}

export function useGetGroupOrderDetail(
  options?: UseQueryOptions<GroupOrderDetail, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    groupOrderId?: string;
  },
) {
  const handleGet: QueryFunction<GroupOrderDetail> = () => {
    return responseWrapper<GroupOrderDetail>(apiClient.getGroupOrderDetail, [
      options?.groupOrderId,
    ]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getGroupOrderDetail,
  } = useQuery<GroupOrderDetail, Error>([`/group-order`, { groupOrderId: options?.groupOrderId }], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: !!options?.groupOrderId,
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

  const handleInvalidateGroupOrderDetail = () => {
    queryClient.invalidateQueries([`/group-order`]);
  };

  return {
    groupOrder: data,
    error,
    isError,
    loading: isFetching,
    getGroupOrderDetail,
    handleInvalidateGroupOrderDetail,
  };
}

export function useGetGroupOrderSummary(
  options?: UseQueryOptions<GroupOrderSummary, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    groupOrderId?: string;
  },
) {
  const handleGet: QueryFunction<GroupOrderSummary> = () => {
    return responseWrapper<GroupOrderSummary>(apiClient.getGroupOrderSummary, [
      options?.groupOrderId,
    ]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getGroupOrderSummary,
  } = useQuery<GroupOrderSummary, Error>(
    [`/group-order/summary`, { groupOrderId: options?.groupOrderId }],
    {
      queryFn: handleGet,
      refetchOnMount: false,
      enabled: !!options?.groupOrderId,
      notifyOnChangeProps: ['data', 'isFetching'],
      select: (data) => data,
      ...options,
    },
  );

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

  const handleInvalidateGroupOrderSummary = () => {
    queryClient.invalidateQueries([`/group-order/summary`]);
  };

  return {
    groupOrderSummary: data,
    error,
    isError,
    loading: isFetching,
    getGroupOrderSummary,
    handleInvalidateGroupOrderSummary,
  };
}

export function useCreateGroupOrder(
  options?: UseMutationOptions<GroupOrderDetail, Error, CreateGroupOrderPayload>,
) {
  const { mutate: createGroupOrder, isLoading } = useMutation<
    GroupOrderDetail,
    Error,
    CreateGroupOrderPayload
  >({
    mutationFn: async (payload: CreateGroupOrderPayload) => {
      return responseWrapper(apiClient.createGroupOrder, [payload]);
    },
    ...options,
  });

  return {
    createGroupOrder,
    isLoading,
  };
}

export function useUpdateGroupOrder(
  options?: UseMutationOptions<GroupOrderDetail, Error, UpdateGroupOrderPayload>,
) {
  const { mutate: updateGroupOrder, isLoading } = useMutation<
    GroupOrderDetail,
    Error,
    UpdateGroupOrderPayload
  >({
    mutationFn: async (payload: UpdateGroupOrderPayload) => {
      return responseWrapper(apiClient.updateGroupOrder, [payload]);
    },
    ...options,
  });

  return {
    updateGroupOrder,
    isLoading,
  };
}

export function useDeleteGroupOrder(
  options?: UseMutationOptions<any, Error, { groupOrderId: string }>,
) {
  const { mutate: deleteGroupOrder, isLoading } = useMutation<any, Error, { groupOrderId: string }>(
    {
      mutationFn: async (payload: { groupOrderId: string }) => {
        return responseWrapper(apiClient.deleteGroupOrder, [payload.groupOrderId]);
      },
      ...options,
    },
  );

  return {
    deleteGroupOrder,
    isLoading,
  };
}

export function useFinalizedGroupOrder(
  options?: UseMutationOptions<GroupOrderDetail, Error, FinalizedGroupOrderPayload>,
) {
  const { mutate: finalizedGroupOrder, isLoading } = useMutation<
    GroupOrderDetail,
    Error,
    FinalizedGroupOrderPayload
  >({
    mutationFn: async (payload: FinalizedGroupOrderPayload) => {
      return responseWrapper(apiClient.finalizedGroupOrder, [payload]);
    },
    ...options,
  });

  return {
    finalizedGroupOrder,
    isLoading,
  };
}

export function useTriggerFinalizedGroupOrder(
  options?: UseMutationOptions<GroupOrderDetail, Error, TriggerFinalizedGroupOrderPayload>,
) {
  const { mutate: triggerFinalizedGroupOrder, isLoading } = useMutation<
    GroupOrderDetail,
    Error,
    TriggerFinalizedGroupOrderPayload
  >({
    mutationFn: async (payload: TriggerFinalizedGroupOrderPayload) => {
      return responseWrapper(apiClient.triggerFinalizedGroupOrder, [payload]);
    },
    ...options,
  });

  return {
    triggerFinalizedGroupOrder,
    isLoading,
  };
}

export function useTriggerDebtGroupOrder(
  options?: UseMutationOptions<GroupOrderDetail, Error, TriggerFinalizedGroupOrderPayload>,
) {
  const { mutate: triggerDebtGroupOrder, isLoading } = useMutation<
    GroupOrderDetail,
    Error,
    TriggerFinalizedGroupOrderPayload
  >({
    mutationFn: async (payload: TriggerFinalizedGroupOrderPayload) => {
      return responseWrapper(apiClient.triggerDebtGroupOrder, [payload]);
    },
    ...options,
  });

  return {
    triggerDebtGroupOrder,
    isLoading,
  };
}

export function useGetGroupOrders(
  options?: UseQueryOptions<GroupOrder[], Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGet: QueryFunction<GroupOrder[]> = () => {
    return responseWrapper<GroupOrder[]>(apiClient.getGroupOrders);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getGroupOrders,
  } = useQuery<GroupOrder[], Error>([`/group-order/group`], {
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

  const handleInvalidateGroupOrders = () => {
    queryClient.invalidateQueries([`/group-order/group`]);
  };

  return {
    groupLists: data,
    error,
    isError,
    loading: isFetching,
    getGroupOrders,
    handleInvalidateGroupOrders,
  };
}
