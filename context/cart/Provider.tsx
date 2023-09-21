import { getCookie, setCookie } from 'cookies-next';
import { ICartProduct, IOrder, IShippingAddress } from 'interfaces';
import { FC, useEffect, useReducer, useRef } from 'react';
import { cookieHelper } from 'utils';
import { CartContext } from './Context';
import { cartReducer } from './Reducer';
import { CartProviderProps, CartState } from './types';
import { tesloAPI } from '../../api';
import { InvalidShippingAddress } from '../../utils/errors';

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: getCookie('cart') ? JSON.parse(getCookie('cart') as string) : [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const firstTimeLoad = useRef(true);

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
      const updatedProductsInCart: ICartProduct[] = state.cart.map((productInCart) => {
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

  const updateShippingAddress = (shippingAddress: IShippingAddress) => {
    cookieHelper.saveAddressToCookies(shippingAddress);
    dispatch({
      type: 'Cart - Update shipping address',
      payload: shippingAddress,
    });
  };

  const createOrder = async () => {
    if (!state.shippingAddress) {
      throw new InvalidShippingAddress('Shipping address is not defined');
    }

    const body: IOrder = {
      isPaid: false,
      numberOfItems: state.numberOfItems,
      orderItems: state.cart.map((product) => ({ ...product, size: product.size! })),
      shippingAddress: state.shippingAddress,
      subtotal: state.subtotal,
      tax: state.tax,
      total: state.total,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = await tesloAPI.post('/orders', body);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    const shippingAddress = cookieHelper.getAddressFromCookies();

    dispatch({
      type: 'Cart - Load shipping address from cookies | storage',
      payload: shippingAddress,
    });
  }, []);

  useEffect(() => {
    let products: ICartProduct[] = [];
    const cookiesProducts = getCookie('cart');

    if (cookiesProducts && typeof cookiesProducts === 'string' && JSON.parse(cookiesProducts)) {
      products = JSON.parse(cookiesProducts);
    }

    firstTimeLoad.current = false;

    dispatch({
      type: 'Cart - Load cart from cookies | storage',
      payload: products,
    });
  }, []);

  useEffect(() => {
    if (firstTimeLoad.current) {
      firstTimeLoad.current = false;
      if (state.cart.length === 0) {
        return;
      }
    }
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
        updateShippingAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
