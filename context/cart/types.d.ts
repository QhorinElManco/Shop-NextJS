import { ReactNode } from 'react';
import { ICartProduct, IShippingAddress } from '../../interfaces';

export interface CartProviderProps {
  children: ReactNode;
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress?: IShippingAddress;
}

export interface CartContextValues extends CartState {
  addProductToCart: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  deleteProductFromCart: (product: ICartProduct) => void;
  updateShippingAddress: (address: IShippingAddress) => void;
  createOrder: () => Promise<void>;
}
