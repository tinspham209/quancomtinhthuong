import { CreateStorePayload } from "@/lib/validators";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

export function useCreateStore(
	options?: UseMutationOptions<any, Error, CreateStorePayload>
) {
	const { mutate: createStore, isLoading } = useMutation<
		any,
		Error,
		CreateStorePayload
	>({
		mutationFn: async (payload: CreateStorePayload) => {
			const { data } = await apiClient.createStore(payload);

			return data;
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
