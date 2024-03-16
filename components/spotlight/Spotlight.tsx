import { useDebouncedValue } from '@mantine/hooks';
import { Spotlight as SpotlightProvider } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useSearch } from 'hooks/queries';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Action } from './Action';

export const Spotlight: FC = () => {
  const router = useRouter();
  // Search
  const [query, setQuery] = useState('');
  const { searchQuery } = useSearch(query);
  const [debounced] = useDebouncedValue(searchQuery.data, 500);
  const [actions, setActions] = useState<ActionData[]>([]);

  // const allActions = actions.map((action) => <Action {...action} />);

  const allActions = actions.map((action) => <Action {...action} />);

  useEffect(() => {
    if (!searchQuery.data) return;

    const actionDefault: ActionData = {
      slug: 'see_all_results',
      image: '1740407-00-A_1.jpg',
      title: 'See all results',
      description: 'Click here to see all the results on one page',
      onTrigger: () => router.push(`/search/${query}`),
    };

    const actionsResult: ActionData[] = searchQuery.data.map((product) => ({
      slug: product.slug,
      image: product.images[0],
      title: product.title,
      price: product.price,
      description: product.description,
      onTrigger: () => router.push(`/product/${product.slug}`),
    }));

    setActions([actionDefault, ...actionsResult]);
  }, [debounced]);

  return (
    <SpotlightProvider.Root
      clearQueryOnClose
      query={query}
      onQueryChange={setQuery}
      onSpotlightClose={() => setActions([])}
    >
      <SpotlightProvider.Search leftSection={<IconSearch size={18} />} placeholder="Search..." />
      <SpotlightProvider.ActionsList>
        {actions ? allActions : <SpotlightProvider.Empty>Nothing found...</SpotlightProvider.Empty>}
      </SpotlightProvider.ActionsList>
    </SpotlightProvider.Root>
  );
};
