import { useQuery } from '@tanstack/react-query';
import { IProduct } from 'interfaces';
import { fetcher } from 'utils/request';

export const useProducts = () => {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => fetcher<IProduct[]>('/api/products', {}),
  });

  return {
    productsQuery,
  };
};
