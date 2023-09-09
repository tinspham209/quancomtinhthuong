/* eslint-disable react-hooks/exhaustive-deps */

import { CreateDishPayload } from "@/lib/validators";
import {
	QueryFunction,
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import apiClient from "../apiClient";
import { responseWrapper } from "../auth/helpers";
import { Callback } from "../auth/types";
import { useFetchCache } from "../cache";
import { Dish } from "./types";

export function useGetDishesByRestaurantId(
	options?: UseQueryOptions<Dish[], Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		restaurantId?: string;
	}
) {
	const handleGet: QueryFunction<Dish[]> = () => {
		return responseWrapper<Dish[]>(apiClient.getDishesByRestaurantId, [
			options?.restaurantId,
		]);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getDishesByRestaurantId,
	} = useQuery<Dish[], Error>(
		[`/dishes`, { restaurantId: options?.restaurantId }],
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
	}, [data, isSuccess]);

	useEffect(() => {
		if (isError) {
			if (options?.onErrorCallback) {
				options.onErrorCallback(error);
			}
		}
	}, [isError]);

	const queryClient = useQueryClient();

	const { fetchCache } = useFetchCache();

	const handleInvalidateDishes = () => {
		fetchCache();
		queryClient.invalidateQueries([`/dishes`]);
	};

	return {
		dishes: data || [],
		error,
		isError,
		loading: isFetching,
		getDishesByRestaurantId,
		handleInvalidateDishes,
	};
}

export function useGetDishByDishId(
	options?: UseQueryOptions<Dish, Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		dishId?: string;
	}
) {
	const handleGet: QueryFunction<Dish> = () => {
		return responseWrapper<Dish>(apiClient.getDishByDishId, [options?.dishId]);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getDishById,
	} = useQuery<Dish, Error>([`/dish`, { dishId: options?.dishId }], {
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

	const { fetchCache } = useFetchCache();

	const handleInvalidateDishById = () => {
		fetchCache();
		queryClient.invalidateQueries([`/dish`]);
	};

	return {
		dish: data,
		error,
		isError,
		loading: isFetching,
		getDishById,
		handleInvalidateDishById,
	};
}

export function useCreateDishes(
	options?: UseMutationOptions<Dish[], Error, CreateDishPayload>
) {
	const { mutate: createDishes, isLoading } = useMutation<
		Dish[],
		Error,
		CreateDishPayload
	>({
		mutationFn: async (payload: CreateDishPayload) => {
			return responseWrapper(apiClient.createDishes, [payload]);
		},
		...options,
	});

	return {
		createDishes,
		isLoading,
	};
}

export function useUpdateDish(options?: UseMutationOptions<Dish, Error, Dish>) {
	const { mutate: updateDish, isLoading } = useMutation<Dish, Error, Dish>({
		mutationFn: async (payload: Dish) => {
			return responseWrapper(apiClient.updateDish, [payload]);
		},
		...options,
	});

	return {
		updateDish,
		isLoading,
	};
}

export function useDeleteDish(
	options?: UseMutationOptions<any, Error, { dishId: string }>
) {
	const { mutate: deleteDish, isLoading } = useMutation<
		any,
		Error,
		{ dishId: string }
	>({
		mutationFn: async (payload: { dishId: string }) => {
			return responseWrapper(apiClient.deleteDish, [payload.dishId]);
		},
		...options,
	});

	return {
		deleteDish,
		isLoading,
	};
}
