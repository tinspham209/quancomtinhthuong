import {
  QueryFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../auth/helpers';
import { GetAppConfigResponse, UpdateAppConfigPayload } from './types';
import { ErrorResponse } from '@/app/types';

export function useGetAppConfig(
  options?: UseQueryOptions<GetAppConfigResponse, ErrorResponse> & {},
) {
  const handleGetAppConfig: QueryFunction<GetAppConfigResponse> = () => {
    return responseWrapper<GetAppConfigResponse>(apiClient.getAppConfig);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: onGetAppConfig,
  } = useQuery<GetAppConfigResponse, ErrorResponse>([`/cache`], {
    queryFn: handleGetAppConfig,
    refetchOnMount: false,
    enabled: true,
    notifyOnChangeProps: ['data', 'isFetching'],
    select: (data) => data,
    staleTime: 6 * 60 * 60 * 100,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetAppConfig = () => {
    queryClient.invalidateQueries([`/app/config`]);
  };

  return {
    appConfig: data,
    error,
    isError,
    isSuccess,
    loading: isFetching,
    onGetAppConfig,
    handleInvalidateGetAppConfig,
  };
}

export function useUpdateAppConfig(
  options?: UseMutationOptions<GetAppConfigResponse, ErrorResponse, UpdateAppConfigPayload>,
) {
  const { mutate: updateAppConfig, isLoading } = useMutation<
    GetAppConfigResponse,
    ErrorResponse,
    UpdateAppConfigPayload
  >({
    mutationFn: async (payload: UpdateAppConfigPayload) => {
      return responseWrapper(apiClient.updateAppConfig, [payload]);
    },
    ...options,
  });

  return {
    updateAppConfig,
    isLoading,
  };
}
