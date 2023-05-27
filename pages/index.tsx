import { Grid, Space, Title } from '@mantine/core';
import { ShopLayout } from 'components/Layouts';
import { ProductList } from 'components/Products';
import { SkeletonRowProductCard } from 'components/UI/Skeletons';
import { useProducts } from 'hooks';

export const HomePage = () => {
  const { productsQuery } = useProducts();

  return (
    <ShopLayout title="Shop NextJS" description="Una tienda llena de productos interesantes">
      <Title order={3}>All products</Title>
      <Space h="md" />
      <Grid>
        {productsQuery.isLoading ? (
          <>
            <SkeletonRowProductCard />
            <SkeletonRowProductCard />
          </>
        ) : (
          <ProductList products={productsQuery.data || []} />
        )}
      </Grid>
    </ShopLayout>
  );
};
export default HomePage;
