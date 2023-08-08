import { CartContext } from 'context';
import { useContext } from 'react';

export const useCartContext = () => useContext(CartContext);
