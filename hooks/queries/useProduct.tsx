import { useQuery } from '@tanstack/react-query';
import { IProduct } from 'interfaces';
import { fetcher } from 'utils/request';

export const useProduct = (slug: string) => {
  const productQuery = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetcher<IProduct>(`/api/products/${slug}`, {}),
  });

  return {
    productQuery,
  };
};
