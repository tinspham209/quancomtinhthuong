import { ChangePasswordPayload } from '@/lib/validators/auth';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../apiClient';
import { responseWrapper } from './helpers';

export function useChangePassword(
  options?: UseMutationOptions<ChangePasswordPayload, Error, ChangePasswordPayload>,
) {
  const { mutate: changePassword, isLoading } = useMutation<
    ChangePasswordPayload,
    Error,
    ChangePasswordPayload
  >({
    mutationFn: (payload: ChangePasswordPayload) => {
      return responseWrapper(apiClient.changePassword, [payload]);
    },
    onError(error) {
      toast.error(error.message);
      console.error(error);
    },
    ...options,
  });

  return {
    changePassword,
    isLoading,
  };
}
