import { useQuery } from '@tanstack/react-query';
import { IProduct } from 'interfaces';
import { fetcher } from 'utils/request';

export const useSearch = (query: string) => {
  const searchQuery = useQuery({
    queryKey: ['search results', { query }],
    queryFn: () => fetcher<IProduct[]>(`/api/search/${query}`, {}),
    enabled: query.trim().length > 0,
  });

  return {
    searchQuery,
  };
};
