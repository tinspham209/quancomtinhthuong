import { SignupPayload } from '@/lib/validators/auth';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../apiClient';
import { responseWrapper } from './helpers';

export function useSignup(options?: UseMutationOptions<any, Error, SignupPayload>) {
  const { mutate: signUp, isLoading } = useMutation<any, Error, SignupPayload>({
    mutationFn: (payload: SignupPayload) => {
      return responseWrapper(apiClient.signUp, [payload]);
    },
    onError(error) {
      toast.error(error.message);
      console.error(error);
    },
    ...options,
  });

  return {
    signUp,
    isLoading,
  };
}
