"use client";

import {
	QueryFunction,
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { Restaurant } from "./types";
import { Callback } from "../auth/types";
import { responseWrapper } from "../auth/helpers";
import apiClient from "../apiClient";
import { useEffect } from "react";
import { CreateRestaurantPayload } from "@/lib/validators/restaurants";

export function useGetRestaurants(
	options?: UseQueryOptions<Restaurant[], Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		userName: string;
	}
) {
	const handleGet: QueryFunction<Restaurant[]> = () => {
		return responseWrapper<Restaurant[]>(apiClient.getRestaurants);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getRestaurants,
	} = useQuery<Restaurant[], Error>([`/restaurants`], {
		queryFn: handleGet,
		refetchOnMount: false,
		enabled: true,
		notifyOnChangeProps: ["data", "isFetching"],
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

	const handleInvalidateRestaurants = () => {
		queryClient.invalidateQueries([`/restaurants`]);
	};

	return {
		restaurants: data || [],
		error,
		isError,
		loading: isFetching,
		getRestaurants,
		handleInvalidateRestaurants,
	};
}

export function useGetRestaurantById(
	options?: UseQueryOptions<Restaurant, Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		restaurantId: string;
	}
) {
	const handleGet: QueryFunction<Restaurant> = () => {
		return responseWrapper<Restaurant>(apiClient.getRestaurantById, [
			options?.restaurantId,
		]);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getRestaurantById,
	} = useQuery<Restaurant, Error>(
		[`/restaurant`, { restaurantId: options?.restaurantId }],
		{
			queryFn: handleGet,
			refetchOnMount: false,
			enabled: true,
			notifyOnChangeProps: ["data", "isFetching"],
			select: (data) => data,
			...options,
		}
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

	const handleInvalidateRestaurantById = () =>
		queryClient.invalidateQueries([`/restaurant`]);

	return {
		restaurantById: data,
		error,
		isError,
		loading: isFetching,
		getRestaurantById,
		handleInvalidateRestaurantById,
	};
}

export function useCreateRestaurant(
	options?: UseMutationOptions<Restaurant, Error, CreateRestaurantPayload>
) {
	const { mutate: createRestaurant, isLoading } = useMutation<
		Restaurant,
		Error,
		CreateRestaurantPayload
	>({
		mutationFn: async (payload: CreateRestaurantPayload) => {
			return responseWrapper(apiClient.createRestaurant, [payload]);
		},
		...options,
	});

	return {
		createRestaurant,
		isLoading,
	};
}

export function useUpdateRestaurant(
	options?: UseMutationOptions<
		Restaurant,
		Error,
		CreateRestaurantPayload & { restaurantId: string }
	>
) {
	const { mutate: updateRestaurant, isLoading } = useMutation<
		Restaurant,
		Error,
		CreateRestaurantPayload & { restaurantId: string }
	>({
		mutationFn: async (
			payload: CreateRestaurantPayload & { restaurantId: string }
		) => {
			return responseWrapper(apiClient.updateRestaurant, [payload]);
		},
		...options,
	});

	return {
		updateRestaurant,
		isLoading,
	};
}

export function useDeleteRestaurant(
	options?: UseMutationOptions<any, Error, { restaurantId: string }>
) {
	const { mutate: deleteRestaurantById, isLoading } = useMutation<
		any,
		Error,
		{ restaurantId: string }
	>({
		mutationFn: async (payload: { restaurantId: string }) => {
			return responseWrapper(apiClient.deleteRestaurantById, [payload]);
		},
		...options,
	});

	return {
		deleteRestaurantById,
		isLoading,
	};
}
