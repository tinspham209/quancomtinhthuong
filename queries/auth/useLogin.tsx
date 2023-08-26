import { LoginPayload } from "@/lib/validators/auth";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { toast } from "react-hot-toast";
import TokenServices from "@/services/token";
import { responseWrapper } from "./helpers";

type LoginResponse = {
	access_token: string;
};

export function useLogin(
	options?: UseMutationOptions<LoginResponse, Error, LoginPayload>
) {
	const { mutate: login, isLoading } = useMutation<
		LoginResponse,
		Error,
		LoginPayload
	>({
		mutationFn: (payload: LoginPayload) => {
			return responseWrapper(apiClient.login, [payload]);
		},
		onError(error) {
			toast.error(error.message);
			console.error(error);
		},
		...options,
	});

	return {
		login,
		isLoading,
	};
}
