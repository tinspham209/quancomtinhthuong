import { Donation, DonationPayment, DonationStatus } from '../donations/types';
import { OrderStatus } from '../orders/types';

export interface GetUserOrdersHistoryParams {
  from: string;
  to: string;
  userId: string;
  status?: OrderStatus;
  historyType?: HistoryType;
}
export interface OrdersHistoryDetail {
  discount: number;
  finalized: boolean;
  imgUrl: any;
  title: string;
  dueTime: string;
  id: string;
  createdAt: string;
  description: string;
  Store: Store;
  Orders: Order[];
  paymentLink: string;
  status: OrderStatus;
  total: number;

  DonationItem?: {
    Store: {
      name: string;
      storeSlug: string;
    };
    title: string;
  };
  donationAmount?: DonationPayment['donationAmount'];
  donationLink: DonationPayment['donationLink'];
  donationStatus: DonationStatus;
}

export interface Store {
  name: string;
  storeSlug: string;
}

export interface Order {
  amount: number;
  Dish: Dish;
  AdditionalOrders: any[];
}

export interface Dish {
  name: string;
  price: number;
  imgUrl: string;
}

export enum HistoryType {
  ORDER = 'ORDER',
  DONATION = 'DONATION',
}
