'use client';

import { UpdateUserPayload } from '@/lib/validators';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { responseWrapper } from '../auth/helpers';

export function useUpdateUser(options?: UseMutationOptions<any, Error, UpdateUserPayload>) {
  const { mutate: updateUser, isLoading } = useMutation<any, Error, UpdateUserPayload>({
    mutationFn: async (payload: UpdateUserPayload) => {
      return responseWrapper(apiClient.updateUser, [payload]);
    },
    ...options,
  });

  return {
    updateUser,
    isLoading,
  };
}
