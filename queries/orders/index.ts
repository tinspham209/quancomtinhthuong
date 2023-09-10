import {
	QueryFunction,
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { OrderDetail } from "./types";
import { Callback } from "../auth/types";
import apiClient from "../apiClient";
import { responseWrapper } from "../auth/helpers";
import { useEffect } from "react";
import { CreateOrderPayload } from "@/lib/validators/orders";

export function useGetOrdersByGroupOrderId(
	options?: UseQueryOptions<OrderDetail[], Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		groupOrderId?: string;
	}
) {
	const handleGet: QueryFunction<OrderDetail[]> = () => {
		return responseWrapper<OrderDetail[]>(apiClient.getOrdersByGroupOrderId, [
			options?.groupOrderId,
		]);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getOrders,
	} = useQuery<OrderDetail[], Error>([`orders/group-order-id`], {
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

	const handleInvalidateOrders = () => {
		queryClient.invalidateQueries([`orders/group-order-id`]);
	};

	return {
		orders: data,
		error,
		isError,
		loading: isFetching,
		getOrders,
		handleInvalidateOrders,
	};
}

export function useCreateOrder(
	options?: UseMutationOptions<OrderDetail, Error, CreateOrderPayload>
) {
	const { mutate: createOrder, isLoading } = useMutation<
		OrderDetail,
		Error,
		CreateOrderPayload
	>({
		mutationFn: async (payload: CreateOrderPayload) => {
			return responseWrapper(apiClient.createOrder, [payload]);
		},
		...options,
	});

	return {
		createOrder,
		isLoading,
	};
}
