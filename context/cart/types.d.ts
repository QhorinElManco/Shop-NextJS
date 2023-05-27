export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface ContextProps {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  deleteProductFromCart: (product: ICartProduct) => void;
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
}
