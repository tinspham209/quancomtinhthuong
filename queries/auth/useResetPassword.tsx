import { ResetPasswordPayload } from '@/lib/validators/auth';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../apiClient';
import { responseWrapper } from './helpers';

export function useResetPassword(
  options?: UseMutationOptions<ResetPasswordPayload, Error, ResetPasswordPayload>,
) {
  const { mutate: resetPassword, isLoading } = useMutation<
    ResetPasswordPayload,
    Error,
    ResetPasswordPayload
  >({
    mutationFn: ({ userName }: ResetPasswordPayload) => {
      return responseWrapper(apiClient.resetPassword, [userName]);
    },
    onError(error) {
      toast.error(error.message);
      console.error(error);
    },
    ...options,
  });

  return {
    resetPassword,
    isLoading,
  };
}
