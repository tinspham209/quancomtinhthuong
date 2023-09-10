import {
	QueryFunction,
	UseQueryOptions,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { GroupOrderList } from "./types";
import { Callback } from "../auth/types";
import { responseWrapper } from "../auth/helpers";
import apiClient from "../apiClient";
import { useEffect } from "react";

export function useGetGroupOrdersListByStoreId(
	options?: UseQueryOptions<GroupOrderList, Error> & {
		onSuccessCallback?: Callback;
		onErrorCallback?: Callback;
		storeId?: string;
	}
) {
	const handleGet: QueryFunction<GroupOrderList> = () => {
		return responseWrapper<GroupOrderList>(
			apiClient.getGroupOrdersListByStoreId,
			[options?.storeId]
		);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: getGroupOrderList,
	} = useQuery<GroupOrderList, Error>([`/group-order/list`], {
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

	const handleInvalidateGroupList = () => {
		queryClient.invalidateQueries([`/group-order/list`]);
	};

	return {
		groupLists: data,
		error,
		isError,
		loading: isFetching,
		getGroupOrderList,
		handleInvalidateGroupList,
	};
}
