import {
  CreateDishPayload,
  CreateStorePayload,
  GetStoresByUserName,
  UpdateStorePayload,
} from '@/lib/validators';
import { LoginPayload, SignupPayload } from '@/lib/validators/auth';
import {
  CreateGroupOrderPayload,
  FinalizedGroupOrderPayload,
  UpdateGroupOrderPayload,
} from '@/lib/validators/group-orders';
import { CreateRestaurantPayload } from '@/lib/validators/restaurants';
import { Store } from '@/queries/auth/types';
import { Dish } from '@/queries/dishes/types';
import apisauce, { CancelToken } from 'apisauce';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import TokenServices from '../token';
import { CreateOrderPayload } from '@/lib/validators/orders';
import { TriggerFinalizedGroupOrderPayload } from '@/queries/group-orders/types';

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

const create = (baseURL = '/api') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
        console.log('error: ', error);
        if (error.response?.status === 404) {
          return toast.error(`This API doesn't exists, Please check the API route again.`);
        }
        if (error.response?.status === 401) {
          toast.error('Unauthorized, Please sign in');
          window.location.reload();
        }
      }
      return Promise.reject(error);
    },
  );

  const getRoot = () => api.get('');

  // Fetch Cache
  const fetchCache = () => {
    return api.get(`/app/cache/fetch`, {}, newCancelToken());
  };

  // Store

  const getStoresByUserName = (userName: GetStoresByUserName['userName']) => {
    return api.get(`/app/store/stores/${userName}`, {}, newCancelToken());
  };

  const getStoreById = (storeId: Store['id']) => {
    return api.get(`/app/store/${storeId}`, {}, newCancelToken());
  };

  const getStoreBySlugName = (storeSlug: Store['storeSlug']) => {
    return api.get(`/app/store/slug/${storeSlug}`, {}, newCancelToken());
  };

  const createStore = (payload: CreateStorePayload) => {
    return api.post(`/app/store/store`, { ...payload }, newCancelToken());
  };

  const updateStore = (payload: UpdateStorePayload) => {
    const id = payload.storeId;
    const formattedPayload = {
      ...payload,
    };
    delete formattedPayload.storeId;

    return api.put(`/app/store/${id}`, { ...formattedPayload }, newCancelToken());
  };

  const deleteStore = (storeId: string) => {
    return api.delete(`/app/store/${storeId}`);
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
    return api.get(`/app/restaurant/restaurants/true`, {}, newCancelToken());
  };

  const getRestaurantById = (restaurantId: string) => {
    if (!restaurantId) return new Promise((res, rej) => res(null));

    return api.get(`/app/restaurant/${restaurantId}/cache/true`, {}, newCancelToken());
  };

  const createRestaurant = (payload: CreateRestaurantPayload) => {
    return api.post(`/app/restaurant`, payload, newCancelToken());
  };

  const updateRestaurant = (payload: CreateRestaurantPayload & { restaurantId: string }) => {
    return api.put(
      `/app/restaurant/${payload.restaurantId}`,
      {
        name: payload.name,
        description: payload.description,
        link: payload.link,
      },
      newCancelToken(),
    );
  };

  const deleteRestaurantById = (restaurantId: string) => {
    return api.delete(`/app/restaurant/${restaurantId}`, {}, newCancelToken());
  };

  // Dishes
  const getDishesByRestaurantId = (restaurantId: string) => {
    if (!restaurantId) return new Promise((res, rej) => res(null));
    return api.get(`/app/dish/restaurant/${restaurantId}/cache/true`, {}, newCancelToken());
  };

  const getDishByDishId = (dishId: string) => {
    if (!dishId) return new Promise((res, rej) => res(null));
    return api.get(`/app/dish/${dishId}/cache/true`, {}, newCancelToken());
  };

  const createDishes = (payload: CreateDishPayload) => {
    return api.post(`/app/dish/${payload.restaurantId}`, payload.dishes, newCancelToken());
  };

  const updateDish = (payload: Dish) => {
    const dishId = payload.id;
    const formattedPayload = {
      ...payload,
    };
    delete formattedPayload.id;

    return api.put(`/app/dish/${dishId}`, { ...formattedPayload }, newCancelToken());
  };

  const deleteDish = (dishId: string) => {
    return api.delete(`/app/dish/${dishId}`, {}, newCancelToken());
  };

  // Group order
  const getGroupOrdersListByStoreId = (storeId: string) => {
    if (!storeId) return new Promise((res, rej) => res(null));

    return api.get(`/app/group-order/groupList/${storeId}`, {}, newCancelToken());
  };

  const getGroupOrderDetail = (groupOrderId: string) => {
    if (!groupOrderId) return new Promise((res, rej) => res(null));

    return api.get(`/app/group-order/${groupOrderId}`, {}, newCancelToken());
  };

  const createGroupOrder = (payload: CreateGroupOrderPayload) => {
    return api.post(`/app/group-order`, payload, newCancelToken());
  };

  const updateGroupOrder = (payload: UpdateGroupOrderPayload) => {
    const groupOrderId = payload.groupOrderId;
    const formattedPayload = {
      ...payload,
    };
    delete formattedPayload.groupOrderId;

    return api.put(`/app/group-order/${groupOrderId}`, { ...formattedPayload }, newCancelToken());
  };

  const deleteGroupOrder = (groupOrderId: string) => {
    return api.delete(`/app/group-order/${groupOrderId}`, {}, newCancelToken());
  };

  const finalizedGroupOrder = (payload: FinalizedGroupOrderPayload) => {
    const groupOrderId = payload.groupOrderId;
    const formattedPayload = {
      ...payload,
    };
    delete formattedPayload.groupOrderId;

    return api.put(`/app/group-order/${groupOrderId}`, { ...formattedPayload }, newCancelToken());
  };

  const triggerFinalizedGroupOrder = ({
    storeId,
    groupOrderId,
  }: TriggerFinalizedGroupOrderPayload) => {
    return api.get(
      `/app/trigger/finalizeOrder/${storeId}/groupOrderId/${groupOrderId}`,
      {},
      newCancelToken(),
    );
  };
  const triggerDebtGroupOrder = ({ storeId, groupOrderId }: TriggerFinalizedGroupOrderPayload) => {
    return api.get(
      `/app/trigger/debt/${storeId}/groupOrderId/${groupOrderId}`,
      {},
      newCancelToken(),
    );
  };

  // Orders
  const getOrdersByGroupOrderId = (groupOrderId: string) => {
    return api.get(`/app/order/orders/${groupOrderId}`, {}, newCancelToken());
  };

  const createOrder = (payload: CreateOrderPayload) => {
    return api.post(`/app/order`, payload, newCancelToken());
  };

  const deleteOrder = (orderId: number) => {
    return api.delete(`/app/order/${orderId}`, {}, newCancelToken());
  };

  return {
    getRoot,

    // Fetch Cache
    fetchCache,

    // Store
    getStoresByUserName,
    createStore,
    updateStore,
    deleteStore,
    getStoreById,
    getStoreBySlugName,

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

    // Dishes
    getDishesByRestaurantId,
    getDishByDishId,
    createDishes,
    updateDish,
    deleteDish,

    // Group order
    getGroupOrdersListByStoreId,
    getGroupOrderDetail,
    createGroupOrder,
    updateGroupOrder,
    deleteGroupOrder,
    finalizedGroupOrder,
    triggerFinalizedGroupOrder,
    triggerDebtGroupOrder,

    // Orders
    getOrdersByGroupOrderId,
    createOrder,
    deleteOrder,
  };
};

export type Apis = ReturnType<typeof create>;

export default create;
