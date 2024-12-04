import {
  CreateDishPayload,
  CreateStorePayload,
  GetStoresByUserName,
  UpdateStorePayload,
  UpdateUserPayload,
} from '@/lib/validators';
import { ChangePasswordPayload, LoginPayload, SignupPayload } from '@/lib/validators/auth';
import {
  CreateGroupOrderPayload,
  FinalizedGroupOrderPayload,
  UpdateGroupOrderPayload,
} from '@/lib/validators/group-orders';
import { CreateOrderPayload } from '@/lib/validators/orders';
import { CreateRestaurantPayload } from '@/lib/validators/restaurants';
import { Store } from '@/queries/auth/types';
import { Dish } from '@/queries/dishes/types';
import { TriggerFinalizedGroupOrderPayload } from '@/queries/group-orders/types';
import { GetUserOrdersHistoryParams } from '@/queries/ordersHistory/type';
import { stringify } from '@/utils';
import apisauce, { CancelToken } from 'apisauce';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import TokenServices from '../token';
import { UpdateAppConfigPayload } from '@/queries/config/types';
import { UpdateGroupDonationPayload } from '@/queries/donations/types';
import _ from 'lodash';
import { CreateGroupDonationPayload, MakeDonationPayload } from '@/lib/validators/donations';
import { CreateInvoicePayload, UpdateInvoicePayload } from '@/queries/invoices/types';

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

  const changePassword = (payload: ChangePasswordPayload) => {
    return api.post(`/app/user/change-p`, payload, newCancelToken());
  };

  const resetPassword = (username: string) => {
    return api.patch(`/app/user/reset/${username}`, newCancelToken());
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

  const enableDisableDishes = (payload: { restaurantId: string; ids: string[] }) => {
    const formattedPayload = {
      ids: payload.ids,
    };

    return api.patch(
      `/app/dish/mass-update/${payload.restaurantId}`,
      { ...formattedPayload },
      newCancelToken(),
    );
  };

  const deleteDish = (dishId: string) => {
    return api.delete(`/app/dish/${dishId}`, {}, newCancelToken());
  };

  // Group order
  const getGroupOrders = () => {
    return api.get(`/app/group-order/groups?finalized=false`, {}, newCancelToken());
  };

  const getGroupOrdersListByStoreId = (storeId: string) => {
    if (!storeId) return new Promise((res, rej) => res(null));

    return api.get(`/app/group-order/groupList/${storeId}`, {}, newCancelToken());
  };

  const getGroupOrderDetail = (groupOrderId: string) => {
    if (!groupOrderId) return new Promise((res, rej) => res(null));

    return api.get(`/app/group-order/${groupOrderId}`, {}, newCancelToken());
  };
  const getGroupOrderSummary = (groupOrderId: string) => {
    if (!groupOrderId) return new Promise((res, rej) => res(null));

    return api.get(`/app/group-order/summary/${groupOrderId}`, {}, newCancelToken());
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
    slackWebhookId,
  }: TriggerFinalizedGroupOrderPayload) => {
    return api.get(
      `/app/trigger/finalizeOrder?storeId=${storeId}&groupOrderId=${groupOrderId}${
        slackWebhookId ? `&slackWebhookId=${slackWebhookId}` : ''
      }`,
      {},
      newCancelToken(),
    );
  };
  const triggerDebtGroupOrder = ({
    storeId,
    groupOrderId,
    slackWebhookId,
  }: TriggerFinalizedGroupOrderPayload) => {
    return api.get(
      `/app/trigger/debt?storeId=${storeId}&groupOrderId=${groupOrderId}${
        slackWebhookId ? `&slackWebhookId=${slackWebhookId}` : ''
      }`,
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

  // History
  const getUserOrdersHistory = (params: GetUserOrdersHistoryParams) => {
    return api.get(`/app/user/history?${stringify(params)}`, {}, newCancelToken());
  };

  // History
  const getAppConfig = () => {
    return api.get(`/app/config}`, {}, newCancelToken());
  };

  const updateAppConfig = (payload: UpdateAppConfigPayload) => {
    return api.put(`/app/config`, { ...payload }, newCancelToken());
  };

  // Notification
  const getUserNotifications = (userName: string) => {
    return api.get(`/app/user/notifications/${userName}`, {}, newCancelToken());
  };

  // Misc
  const getRandomImage = (numberOfImages: string) => {
    const ACCESS_UNSPLASH_KEY = process.env.NEXT_PUBLIC_ACCESS_UNSPLASH_KEY;

    return api.get(
      `https://api.unsplash.com/photos/random/?client_id=${ACCESS_UNSPLASH_KEY}&count=${
        numberOfImages || 1
      }`,
      {},
      newCancelToken(),
    );
  };

  //user
  const updateUser = (payload: UpdateUserPayload) => {
    return api.put(`/app/user`, payload, newCancelToken());
  };

  // Donations
  const getListDonations = () => {
    return api.get(`/app/donation/donations`, {}, newCancelToken());
  };
  const getDonationById = (donationId: string) => {
    return api.get(`/app/donation/${donationId}`, {}, newCancelToken());
  };
  const createGroupDonation = (payload: CreateGroupDonationPayload) => {
    return api.post(
      `/app/donation`,
      {
        ...payload,
        imgUrls: payload.imgUrls.map((url) => url.url),
      },
      newCancelToken(),
    );
  };
  const updateGroupDonation = (payload: UpdateGroupDonationPayload) => {
    const donationId = payload.donationId;
    const formattedPayload = _.omit(payload, 'donationId');

    return api.put(
      `/app/donation/${donationId}`,
      {
        ...formattedPayload,
        imgUrls: formattedPayload.imgUrls.map((url) => url.url),
      },
      newCancelToken(),
    );
  };

  const deleteGroupDonation = (donationId: string) => {
    return api.delete(`/app/donation/${donationId}`, {}, newCancelToken());
  };

  const makeDonation = (payload: MakeDonationPayload) => {
    const donationId = payload.donationId;
    const formattedPayload = _.omit(payload, 'donationId');

    return api.post(
      `/app/donation/makeDonation/${donationId}`,
      {
        ...formattedPayload,
      },
      newCancelToken(),
    );
  };

  const triggerDonation = (payload: { donationId: string, slackWebhookId?: string }) => {
    const { donationId } = payload;
    return api.get(`/app/trigger/donation/${donationId}/slackWebhook/${payload.slackWebhookId}`, {}, newCancelToken());
  };

  //
  const getSlackWebhooks = () => {
    return api.get(`/app/config/slack-webhooks`, {}, newCancelToken());
  };

  //Invoices
  const getInvoices = (donationItemId: string) => {
    return api.get(`/app/invoice/invoices/${donationItemId}`, {}, newCancelToken());
  };

  const createInvoice = (payload: CreateInvoicePayload) => {
    return api.post(
      `/app/invoice/${payload.donationItemId}`,
      { ...payload, imgUrls: payload.imgUrls.map((url) => url.url) },
      newCancelToken(),
    );
  };

  const updateInvoice = (payload: UpdateInvoicePayload) => {
    return api.put(
      `/app/invoice/${payload.invoiceId}`,
      {
        ...payload,
        invoiceId: undefined,
        imgUrls: payload.imgUrls.map((url) => url.url),
      },
      newCancelToken(),
    );
  };

  const deleteInvoice = (invoiceId: number) => {
    return api.delete(`/app/invoice/${invoiceId}`, {}, newCancelToken());
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
    changePassword,
    resetPassword,
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
    enableDisableDishes,
    deleteDish,

    // Group order
    getGroupOrders,
    getGroupOrdersListByStoreId,
    getGroupOrderDetail,
    getGroupOrderSummary,
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

    // History
    getUserOrdersHistory,

    // App config
    getAppConfig,
    updateAppConfig,

    // Notifications
    getUserNotifications,

    // misc
    getRandomImage,

    //user
    updateUser,

    // Donations
    getListDonations,
    getDonationById,
    createGroupDonation,
    updateGroupDonation,
    deleteGroupDonation,
    makeDonation,
    triggerDonation,

    //SlackWebhook
    getSlackWebhooks,

    // Invoices
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
};

export type Apis = ReturnType<typeof create>;

export default create;
