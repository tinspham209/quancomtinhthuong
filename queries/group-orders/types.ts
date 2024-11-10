import { Dish } from '../dishes/types';
import { Restaurant } from '../restaurants/types';

export type GroupOrderDetail = {
  id: string;
  limit: number;
  discount: number;
  restaurantId: string;
  title: string;
  imgUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  finalized: boolean;
  storeId: string;
  restaurant: Restaurant;
  dueTime: string;
  boomboxId: string;
};

export type GroupOrderList = {
  dateTabs: string[];
  groupOrders: GroupOrderDetail[][];
};

export type TriggerFinalizedGroupOrderPayload = {
  storeId: string;
  groupOrderId: string;
  slackWebhookId?: string | null;
};

export type GroupOrderSummary = {
  id: string;
  discount: number;
  limit: number;
  finalized: boolean;
  dueTime: string;
  imgUrl: string | null;
  restaurant: {
    id: string;
    name: string;
    link: string;
    imgUrl: any;
  };
  Store: {
    id: string;
    bankInfo: any;
    imgUrl: string;
    qrImgUrl: string;
    name: string;
    storeSlug: string;
  };
  _count: {
    Orders: number;
  };
  orders: {
    id: string;
    price: number;
    name: string;
    imgUrl: string;
    amount: number;
    users: User[];
    usersLength: number;
  }[];
  totalPrice: number;
};

export type User = {
  userName: string;
  imgUrl: string;
  name: string;
  id: string;
  amount: number;
  additionalOrders: { id: string; amount: number; Dish: Dish }[];
};

export type GroupOrder = {
  id: string;
  limit: number;
  discount: number;
  restaurantId: string;
  title: string;
  imgUrl: any;
  description: string;
  createdAt: string;
  updatedAt: string;
  finalized: boolean;
  dueTime: string;
  storeId: string;
  boomboxId: any;
  restaurant: {
    id: string;
    name: string;
    link: string;
    description: string;
    imgUrl: any;
    createdAt: string;
    updatedAt: string;
  };
  Store: {
    storeSlug: string;
    name: string;
    id: string;
  };
  Orders: {
    id: number;
    amount: number;
    status: string;
    confirm: boolean;
    orderNumber: number;
    note: string;
    groupOrderId: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    dishId: string;
    orderCode: number;
    paymentLink?: string;
    limitAdditionalOrder: number;
    User: {
      userName: string;
      imgUrl: string;
    };
  }[];
  _count: {
    Orders: number;
  };
};
