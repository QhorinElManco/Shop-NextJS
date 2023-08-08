import { IProductSize } from './products';

export interface ICartProduct {
  _id: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  image: string;
  price: number;
  quantity: number;
  size?: IProductSize;
  slug: string;
  title: string;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}
