import { Flex, Grid, Space, Title } from '@mantine/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ShopLayout } from 'components/Layouts';
import { ProductList } from 'components/Products';
import { dbProducts } from 'database';

import { useProducts, useSearch } from 'hooks/queries';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

interface Props {
  query: string;
  foundProducts: boolean;
}

export const SearchProductPage: FC<Props> = ({ query, foundProducts }) => {
  const resultsQuery = foundProducts ? useSearch(query).searchQuery : useProducts().productsQuery;

  return (
    <ShopLayout title="Shop NextJS" description="Una tienda llena de productos interesantes">
      <Title order={3}>Search product</Title>

      <Flex gap={5}>
        {foundProducts ? (
          <>
            <Title order={4} transform="capitalize">
              Term:
            </Title>
            <Title order={4} color="blue">
              {query}
            </Title>
          </>
        ) : (
          <>
            <Title order={4}>We did not find any products</Title>
            <Title order={4} color="blue">
              {query}
            </Title>
          </>
        )}
      </Flex>

      <Space h="md" />
      <Grid>
        <ProductList products={resultsQuery.data ?? []} />
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };
  const queryClient = new QueryClient();

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const products = await queryClient.fetchQuery({
    queryKey: ['search results', { query }],
    queryFn: () => dbProducts.getProductsBySearch(query),
  });

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    await queryClient.fetchQuery({
      queryKey: ['products'],
      queryFn: () => dbProducts.getAllProducts(),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      foundProducts,
      query,
    },
  };
};

export default SearchProductPage;
