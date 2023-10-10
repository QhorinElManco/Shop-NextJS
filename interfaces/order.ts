import { IShippingAddress } from './cart';
import { IProductSize } from './products';
import { IUser } from './user';

export interface IOrderItem {
  _id: string;
  title: string;
  size: IProductSize;
  quantity: number;
  slug: string;
  price: number;
  image: string;
}

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string;
}
