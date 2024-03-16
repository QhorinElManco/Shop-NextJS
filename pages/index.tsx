import { Grid, Space, Title } from '@mantine/core';
import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { SkeletonRowProductCard } from '@/components/UI';
import { useProducts } from '@/hooks/queries';

export const HomePage = () => {
  const { productsQuery } = useProducts();

  return (
    <ShopLayout title="Shop NextJS" description="Una tienda llena de productos interesantes">
      <Title order={3}>All products</Title>
      <Space h="md" />

      {productsQuery.isLoading ? (
        <Grid>
          <SkeletonRowProductCard />
          <SkeletonRowProductCard />
        </Grid>
      ) : (
        <ProductList products={productsQuery.data || []} />
      )}
    </ShopLayout>
  );
};
export default HomePage;
