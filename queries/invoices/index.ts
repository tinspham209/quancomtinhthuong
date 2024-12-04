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
import { CreateInvoicePayload, Invoice, Invoices, UpdateInvoicePayload } from './types';
import { Callback } from '../auth/types';
import { useEffect } from 'react';

export function useGetInvoicesById(
  options?: UseQueryOptions<Invoices, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
    donationItemId: string;
  },
) {
  const handleGet: QueryFunction<Invoices> = () => {
    return responseWrapper<Invoices>(apiClient.getInvoices, [
      options?.donationItemId,
    ]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: getInvoices,
  } = useQuery<Invoices, Error>([`/invoice/invoices`], {
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

  const handleInvalidateInvoices = () => {
    queryClient.invalidateQueries([`/invoice/invoices`]);
  };

  return {
    donationInvoice: data,
    error,
    isError,
    loading: isFetching,
    getInvoices,
    handleInvalidateInvoices,
  };
}

export function useCreateInvoice(
  options?: UseMutationOptions<Invoice, Error, CreateInvoicePayload>,
) {
  const { mutate: createInvoice, isLoading } = useMutation<Invoice, Error, CreateInvoicePayload>({
    mutationFn: async (payload: CreateInvoicePayload) => {
      return responseWrapper(apiClient.createInvoice, [payload]);
    },
    ...options,
  });

  return {
    createInvoice,
    isLoading,
  };
}

export function useUpdateInvoice(
  options?: UseMutationOptions<Invoice, Error, UpdateInvoicePayload>,
) {
  const { mutate: updateInvoice, isLoading } = useMutation<Invoice, Error, UpdateInvoicePayload>({
    mutationFn: async (payload: UpdateInvoicePayload) => {
      return responseWrapper(apiClient.updateInvoice, [payload]);
    },
    ...options,
  });

  return {
    updateInvoice,
    isLoading,
  };
}

export function useDeleteInvoice(options?: UseMutationOptions<any, Error, { invoiceId: number }>) {
  const { mutate: deleteInvoice, isLoading } = useMutation<any, Error, { invoiceId: number }>({
    mutationFn: async (payload: { invoiceId: number }) => {
      return responseWrapper(apiClient.deleteInvoice, [payload.invoiceId]);
    },
    ...options,
  });

  return {
    deleteInvoice,
    isLoading,
  };
}
