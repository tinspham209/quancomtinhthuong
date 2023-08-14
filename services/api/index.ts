import { CreateStorePayload, SettingFormPayload } from "@/lib/validators";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const AXIOS_CONFIG = {
	CONNECTION_TIMEOUT: 30000,
};

axios.defaults.withCredentials = true;

const create = (baseURL = "/api") => {
	const api = axios.create({
		baseURL,
		headers: {
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Expires: 0,
			Accept: "application/json",
		},
		timeout: AXIOS_CONFIG.CONNECTION_TIMEOUT,
	});

	api.interceptors.request.use((config) => {
		return Promise.resolve(config);
	});

	api.interceptors.response.use(
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
			}
			return Promise.reject(error);
		}
	);

	const getRoot = () => api.get("");

	// Store
	const createStore = (payload: CreateStorePayload) => {
		return api.post(`/stores`, { ...payload });
	};

	const updateSettingStore = (payload: SettingFormPayload) => {
		const storeId = payload.storeId;

		const formattedPayload = {
			...payload,
		};
		delete formattedPayload.storeId;

		return api.patch(`/stores/${storeId}`, { ...formattedPayload });
	};

	const deleteStore = (payload: { storeId: string }) => {
		return api.delete(`/stores/${payload.storeId}`);
	};

	return {
		getRoot,

		// Store
		createStore,
		updateSettingStore,
		deleteStore,
	};
};

export type Apis = ReturnType<typeof create>;

export default create;
