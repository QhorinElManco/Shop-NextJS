import { Grid, Space, Title } from '@mantine/core';
import { ShopLayout } from 'components/Layouts';
import { initialData } from 'database/products';
import { ProductList } from '../components/Products';

export default function HomePage() {
  return (
    <ShopLayout title="Shop NextJS" description="Una tienda llena de productos interesantes">
      <Title order={3}>All products</Title>
      <Space h="md" />
      <Grid>
        <ProductList products={initialData.products as any} />
      </Grid>
    </ShopLayout>
  );
}
