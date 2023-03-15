import { useDebouncedValue } from '@mantine/hooks';
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useSearch } from 'hooks';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import { CustomActionComponent } from './CustomAction';

interface Props {
  children: ReactNode;
}

export const Spotlight: FC<Props> = ({ children }) => {
  const router = useRouter();
  // Search
  const [query, setQuery] = useState('');
  const { searchQuery } = useSearch(query);
  const [debounced] = useDebouncedValue(searchQuery.data, 300);
  const [actions, setActions] = useState<SpotlightAction[]>([]);

  useEffect(() => {
    if (!searchQuery.data) return;

    const actionDefault: SpotlightAction = {
      slug: 'see_all_results',
      image: '1740407-00-A_1.jpg',
      title: 'See all results',
      description: 'Click here to see all the results on one page',
      onTrigger: () => router.push(`/search/${query}`),
    };

    const actionsResult: SpotlightAction[] = searchQuery.data.map((product) => ({
      slug: product.slug,
      image: product.images[0],
      title: product.title,
      price: product.price,
      onTrigger: () => router.push(`/product/${product.slug}`),
    }));

    setActions([actionDefault, ...actionsResult]);
  }, [debounced]);

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      cleanQueryOnClose
      query={query}
      onQueryChange={setQuery}
      highlightQuery
      actionComponent={CustomActionComponent}
      nothingFoundMessage={searchQuery.isLoading ? 'Loading' : 'Nothing found...'}
      onSpotlightClose={() => setActions([])}
    >
      {children}
    </SpotlightProvider>
  );
};
