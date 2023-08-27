"use client";

import { CreateStorePayload, CreateStoreResponse } from "@/lib/validators";
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
import { Callback, Store } from "../auth/types";

export function useGetStoresByUserName(
	options?: UseQueryOptions<Store[], Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		userName: string;
	}
) {
	const handleGet: QueryFunction<Store[]> = () => {
		return responseWrapper<Store[]>(apiClient.getStoresByUserName, [
			options?.userName,
		]);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getStoresByUserName,
	} = useQuery<Store[], Error>([`/store/stores/userName`], {
		queryFn: handleGet,
		refetchOnMount: false,
		enabled: false,
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

	const handleInvalidateStoresByUserName = () => {
		queryClient.invalidateQueries([`/store/stores/userName`]);
		getStoresByUserName();
	};

	return {
		storesByUserName: data,
		error,
		isError,
		loading: isFetching,
		getStoresByUserName,
		handleInvalidateStoresByUserName,
	};
}

export function useCreateStore(
	options?: UseMutationOptions<CreateStoreResponse, Error, CreateStorePayload>
) {
	const { mutate: createStore, isLoading } = useMutation<
		CreateStoreResponse,
		Error,
		CreateStorePayload
	>({
		mutationFn: async (payload: CreateStorePayload) => {
			return responseWrapper(apiClient.createStore, [payload]);
		},
		...options,
	});

	return {
		createStore,
		isLoading,
	};
}

export function useDeleteStore(
	options?: UseMutationOptions<any, Error, { storeId: string }>
) {
	const { mutate: deleteStore, isLoading } = useMutation<
		any,
		Error,
		{ storeId: string }
	>({
		mutationFn: async (payload: { storeId: string }) => {
			const { data } = await apiClient.deleteStore(payload);

			return data;
		},
		...options,
	});

	return {
		deleteStore,
		isLoading,
	};
}

export function useGetStoreById(
	options?: UseQueryOptions<Store, Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		storeId: string;
	}
) {
	const handleGet: QueryFunction<Store> = () => {
		return responseWrapper<Store>(apiClient.getStoreById, [options?.storeId]);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getStoreById,
	} = useQuery<Store, Error>([`/store/storeId`], {
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

	const handleInvalidateStoreById = () =>
		queryClient.invalidateQueries([`/store/storeId`]);

	return {
		storeById: data,
		error,
		isError,
		loading: isFetching,
		getStoreById,
		handleInvalidateStoreById,
	};
}
