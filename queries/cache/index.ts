import {
	QueryFunction,
	UseQueryOptions,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import apiClient from "../apiClient";
import { responseWrapper } from "../auth/helpers";

export function useFetchCache(options?: UseQueryOptions<any, Error> & {}) {
	const handleGet: QueryFunction<any> = () => {
		return responseWrapper<any>(apiClient.fetchCache);
	};
	const {
		data,
		error,
		isError,
		isSuccess,
		isFetching,
		refetch: fetchCache,
	} = useQuery<any, Error>([`/cache`], {
		queryFn: handleGet,
		refetchOnMount: false,
		enabled: false,
		notifyOnChangeProps: ["data", "isFetching"],
		select: (data) => data,
		staleTime: 5000,
		...options,
	});

	const queryClient = useQueryClient();

	const handleInvalidateCache = () => {
		queryClient.invalidateQueries([`/cache`]);
	};

	return {
		error,
		isError,
		loading: isFetching,
		fetchCache,
		handleInvalidateCache,
	};
}
