import { CreateStorePayload, GetStoresByUserName } from "@/lib/validators";
import { LoginPayload, SignupPayload } from "@/lib/validators/auth";
import { CreateRestaurantPayload } from "@/lib/validators/restaurants";
import { Store } from "@/queries/auth/types";
import apisauce, { CancelToken } from "apisauce";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import TokenServices from "../token";

const AXIOS_CONFIG = {
	CONNECTION_TIMEOUT: 30000,
};

axios.defaults.withCredentials = true;

export function newCancelToken(timeout = 30000) {
	const source = CancelToken.source();
	setTimeout(() => {
		source.cancel();
	}, timeout);

	return { cancelToken: source.token };
}

const create = (baseURL = "/api") => {
	const api = apisauce.create({
		baseURL,
		headers: {
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Expires: 0,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		timeout: AXIOS_CONFIG.CONNECTION_TIMEOUT,
	});

	api.axiosInstance.interceptors.request.use((config) => {
		const token = TokenServices.getToken();
		config.headers.Authorization = `Bearer ${token}`;
		return Promise.resolve(config);
	});

	api.axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 404) {
					return toast.error(
						`This API doesn't exists, Please check the API route again.`
					);
				}
				if (error.response?.status === 401) {
					toast.error("Unauthorized, Please sign in");
					window.location.reload();
				}
			}
			return Promise.reject(error);
		}
	);

	const getRoot = () => api.get("");

	// Store

	const getStoresByUserName = (userName: GetStoresByUserName["userName"]) => {
		return api.get(`/app/store/stores/${userName}`, {}, newCancelToken());
	};

	const getStoreById = (storeId: Store["id"]) => {
		return api.get(`/app/store/${storeId}`, {}, newCancelToken());
	};

	const createStore = (payload: CreateStorePayload) => {
		return api.post(`/app/store/store`, { ...payload }, newCancelToken());
	};

	const deleteStore = (payload: { storeId: string }) => {
		return api.delete(`/stores/${payload.storeId}`);
	};

	// Auth
	const login = (payload: LoginPayload) => {
		return api.post(`/app/auth/login`, payload, newCancelToken());
	};

	const signUp = (payload: SignupPayload) => {
		return api.post(`/app/user/sign-up`, payload, newCancelToken());
	};

	const getMyProfile = () => {
		return api.get(`/app/auth/profile`, {}, newCancelToken());
	};

	// Restaurant
	const getRestaurants = () => {
		return api.get(`/app/restaurant/restaurants/false`, {}, newCancelToken());
	};

	const getRestaurantById = (restaurantId: string) => {
		return api.get(
			`/app/restaurant/${restaurantId}/cache/false`,
			{},
			newCancelToken()
		);
	};

	const createRestaurant = (payload: CreateRestaurantPayload) => {
		return api.post(`/app/restaurant`, payload, newCancelToken());
	};

	const updateRestaurant = (
		payload: CreateRestaurantPayload & { restaurantId: string }
	) => {
		return api.put(
			`/app/restaurant/${payload.restaurantId}`,
			{
				name: payload.name,
				description: payload.description,
				link: payload.link,
			},
			newCancelToken()
		);
	};

	const deleteRestaurantById = (restaurantId: string) => {
		return api.delete(`/app/restaurant/${restaurantId}`, {}, newCancelToken());
	};

	return {
		getRoot,

		// Store
		getStoresByUserName,
		createStore,
		deleteStore,
		getStoreById,

		// Auth
		login,
		signUp,
		getMyProfile,

		// Restaurant
		getRestaurants,
		getRestaurantById,
		createRestaurant,
		updateRestaurant,
		deleteRestaurantById,
	};
};

export type Apis = ReturnType<typeof create>;

export default create;
