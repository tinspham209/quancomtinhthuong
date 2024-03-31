import {
  QueryFunction,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Donation, UpdateGroupDonationPayload } from './types';
import apiClient from '../apiClient';
import { responseWrapper } from '../auth/helpers';
import { CreateGroupDonationPayload } from '@/lib/validators/donations';
import { isEmpty } from '@/utils';

export function useGetListDonations(options?: UseQueryOptions<Donation[], Error>) {
  const handleGet: QueryFunction<Donation[]> = () => {
    return responseWrapper<Donation[]>(apiClient.getListDonations);
  };
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getListDonations,
  } = useQuery<Donation[], Error>([`/donation/donations`], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: true,
    notifyOnChangeProps: ['data', 'isFetching'],
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateListDonations = () => {
    queryClient.invalidateQueries([`/donation/donations`]);
  };

  return {
    listDonations: data,
    error,
    isError,
    loading: isFetching,
    getListDonations,
    handleInvalidateListDonations,
  };
}

export function useGetDonationById(
  options?: UseQueryOptions<Donation, Error> & {
    donationId?: number;
  },
) {
  const handleGet: QueryFunction<Donation> = () => {
    return responseWrapper<Donation>(apiClient.getDonationById, [options?.donationId]);
  };
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: getDonationById,
  } = useQuery<Donation, Error>([`/donation/donation`, { id: options?.donationId }], {
    queryFn: handleGet,
    refetchOnMount: false,
    enabled: !isEmpty(options?.donationId),
    notifyOnChangeProps: ['data', 'isFetching'],
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateDonationById = (donationId?: number) => {
    if (donationId) {
      queryClient.invalidateQueries([`/donation/donation`, { id: donationId }]);
      return;
    }
    return queryClient.invalidateQueries([`/donation/donation`]);
  };

  return {
    donationDetail: data,
    error,
    isError,
    loading: isFetching,
    getDonationById,
    handleInvalidateDonationById,
  };
}

export function useCreateGroupDonation(
  options?: UseMutationOptions<Donation, Error, CreateGroupDonationPayload>,
) {
  const { mutate: createGroupDonation, isLoading } = useMutation<
    Donation,
    Error,
    CreateGroupDonationPayload
  >({
    mutationFn: async (payload: CreateGroupDonationPayload) => {
      return responseWrapper(apiClient.createGroupDonation, [payload]);
    },
    ...options,
  });

  return {
    createGroupDonation,
    isLoading,
  };
}

export function useUpdateGroupDonation(
  options?: UseMutationOptions<Donation, Error, UpdateGroupDonationPayload> & {
    donationId?: Donation['id'];
  },
) {
  const { mutate: updateGroupDonation, isLoading } = useMutation<
    Donation,
    Error,
    UpdateGroupDonationPayload
  >({
    mutationFn: async (payload: UpdateGroupDonationPayload) => {
      return responseWrapper(apiClient.updateGroupDonation, [payload]);
    },
    ...options,
  });

  return {
    updateGroupDonation,
    isLoading,
  };
}

export function useDeleteGroupDonation(
  options?: UseMutationOptions<Donation, Error, { donationId: Donation['id'] }>,
) {
  const { mutate: deleteGroupDonation, isLoading } = useMutation<
    Donation,
    Error,
    { donationId: Donation['id'] }
  >({
    mutationFn: async (payload: { donationId: Donation['id'] }) => {
      return responseWrapper(apiClient.deleteGroupDonation, [payload.donationId]);
    },
    ...options,
  });

  return {
    deleteGroupDonation,
    isLoading,
  };
}
