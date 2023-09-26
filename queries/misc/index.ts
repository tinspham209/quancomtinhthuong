import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { RandomUnsplashImage } from './types';
import { responseWrapper } from '../auth/helpers';
import apiClient from '../apiClient';

export function useGetRandomImage(
  options?: UseQueryOptions<Array<RandomUnsplashImage>, Error> & {
    numberOfImages: number;
  },
) {
  const handleGetRandomImage: QueryFunction<Array<RandomUnsplashImage>> = () => {
    return responseWrapper<Array<RandomUnsplashImage>>(apiClient.getRandomImage, [
      options?.numberOfImages,
    ]);
  };
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching,
    refetch: onGetRandomImage,
  } = useQuery<Array<RandomUnsplashImage>, Error>([`/photos/random`], {
    queryFn: handleGetRandomImage,
    refetchOnMount: false,
    enabled: true,
    notifyOnChangeProps: ['data', 'isFetching'],
    select: (data) => data,
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetRandomImage = () => {
    queryClient.invalidateQueries([`/photos/random`]);
  };

  return {
    randomImage: data,
    error,
    isError,
    isSuccess,
    loading: isFetching,
    onGetRandomImage,
    handleInvalidateGetRandomImage,
  };
}
