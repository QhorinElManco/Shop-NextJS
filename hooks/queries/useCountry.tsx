import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../utils/request';
import { ICountry } from '../../interfaces';

export const useCountry = () =>
  useQuery({
    queryKey: ['countries'],
    queryFn: () => fetcher<ICountry[]>('/api/countries', {}),
    staleTime: Infinity,
  });
