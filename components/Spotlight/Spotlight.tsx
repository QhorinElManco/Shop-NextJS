import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useSearch } from 'hooks';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import { CustomAction } from './CustomAction';

interface Props {
  children: ReactNode;
}

export const Spotlight: FC<Props> = ({ children }) => {
  const router = useRouter();
  // Search
  const [query, setQuery] = useState('');
  const { searchQuery } = useSearch(query);
  const [actions, setActions] = useState<SpotlightAction[]>([]);

  useEffect(() => {
    if (!searchQuery.data) return;

    const actionsResult = searchQuery.data?.map((product) => ({
      slug: product.slug,
      image: product.images[0],
      title: product.title,
      description: product.description,
      price: product.price,
      onTrigger: () => router.push(`/product/${product.slug}`),
    }));

    setActions(actionsResult);
  }, [searchQuery.data]);

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
      cleanQueryOnClose
      query={query}
      onQueryChange={setQuery}
      highlightQuery
      actionComponent={CustomAction}
    >
      {children}
    </SpotlightProvider>
  );
};
