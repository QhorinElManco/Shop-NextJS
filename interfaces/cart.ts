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
