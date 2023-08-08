import { ICartProduct, IShippingAddress } from 'interfaces';
import { CartState } from './types';

type CartActionType =
  | {
      type: 'Cart - Load cart from cookies | storage';
      payload: ICartProduct[];
    }
  | {
      type: 'Cart - Update products in cart';
      payload: ICartProduct[];
    }
  | {
      type: 'Cart - Change product quantity';
      payload: ICartProduct;
    }
  | {
      type: 'Cart - Delete product from cart';
      payload: ICartProduct;
    }
  | {
      type: 'Cart - Update order summary';
      payload: {
        numberOfItems: number;
        subtotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: 'Cart - Load shipping address from cookies | storage';
      payload: IShippingAddress;
    }
  | {
      type: 'Cart - Update shipping address';
      payload: IShippingAddress;
    };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart - Load cart from cookies | storage':
      return {
        ...state,
        cart: [...action.payload],
        isLoaded: true,
      };

    case 'Cart - Update products in cart':
      return {
        ...state,
        cart: [...action.payload],
      };

    case 'Cart - Change product quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload._id && product.size === action.payload.size) {
            return action.payload;
          }
          return product;
        }),
      };

    case 'Cart - Delete product from cart':
      return {
        ...state,
        cart: state.cart.filter(
          (product) => !(product._id === action.payload._id && product.size === action.payload.size)
        ),
      };

    case 'Cart - Update order summary':
      return {
        ...state,
        ...action.payload,
      };

    case 'Cart - Update shipping address':
    case 'Cart - Load shipping address from cookies | storage':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
