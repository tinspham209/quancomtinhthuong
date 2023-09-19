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
};

export type GroupOrderList = {
  dateTabs: string[];
  groupOrders: GroupOrderDetail[][];
};

export type TriggerFinalizedGroupOrderPayload = {
  storeId: string;
  groupOrderId: string;
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
    users: {
      userName: string;
      imgUrl: string;
      name: string;
      id: string;
      additionalOrders: any[];
    }[];
    usersLength: number;
  }[];
  totalPrice: number;
};
