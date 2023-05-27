import { getCookie, setCookie } from 'cookies-next';
import { ICartProduct } from 'interfaces';
import { FC, useEffect, useReducer } from 'react';
import { CartContext } from './Context';
import { cartReducer } from './Reducer';
import { CartProviderProps, CartState } from './types';

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const isProductInCart = state.cart.find((p) => product._id === p._id);

    if (!isProductInCart) {
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product],
      });
    }

    const productInCartSameSize = state.cart.find(
      (p) => product._id === p._id && product.size === p.size
    );

    if (productInCartSameSize) {
      const updatedProductsInCart = state.cart.map((productInCart) => {
        if (productInCart._id === product._id && productInCart.size === product.size) {
          return {
            ...productInCart,
            quantity: productInCart.quantity + product.quantity,
          };
        }
        return productInCart;
      });

      return dispatch({
        type: 'Cart - Update products in cart',
        payload: updatedProductsInCart,
      });
    }

    return dispatch({
      type: 'Cart - Update products in cart',
      payload: [...state.cart, product],
    });
  };

  const updateProductQuantity = (product: ICartProduct) => {
    dispatch({
      type: 'Cart - Change product quantity',
      payload: product,
    });
  };

  const deleteProductFromCart = (product: ICartProduct) => {
    dispatch({
      type: 'Cart - Delete product from cart',
      payload: product,
    });
  };

  useEffect(() => {
    const cookiesProducts = getCookie('cart');

    if (cookiesProducts && typeof cookiesProducts === 'string') {
      const products = JSON.parse(cookiesProducts);

      dispatch({
        type: 'Cart - Reload cart from cookies | storage',
        payload: products,
      });
    }
  }, []);

  useEffect(() => {
    setCookie('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subtotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (1 + taxRate),
    };

    dispatch({
      type: 'Cart - Update order summary',
      payload: orderSummary,
    });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateProductQuantity,
        deleteProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
