import { Box, Button, Grid, Text, Title } from '@mantine/core';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ShopLayout } from 'components/Layouts';
import { ProductCarousel, SizeSelector } from 'components/Products';
import { dbProducts } from 'database';
import { useProduct } from 'hooks';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FullScreenLoading, ItemCounter } from '../../components/UI';

export const ProductPage = () => {
  const { query } = useRouter();

  const { productQuery } = useProduct(query.slug as string);

  if (productQuery.isLoading) {
    return <FullScreenLoading />;
  }

  if (!productQuery.data) {
    return <p>Error</p>;
  }

  return (
    <ShopLayout title={productQuery.data.title} description={productQuery.data.description}>
      <Grid>
        <Grid.Col xs={12} sm={7}>
          {/* Carrusel */}
          <ProductCarousel images={productQuery.data.images} />
        </Grid.Col>
        <Grid.Col xs={12} sm={5}>
          {/* Titulo */}
          <Box>
            <Title order={1}>{productQuery.data.title}</Title>
            <Title order={2}>${productQuery.data.price}</Title>
          </Box>
          {/* Tallas */}
          <Box my="xl">
            <Title order={4}>Size</Title>
            <SizeSelector
              selectedSize={productQuery.data.sizes[0]}
              sizes={productQuery.data.sizes}
              mt="xs"
            />
          </Box>
          {/* Cantidad */}
          <Box my="xl">
            <Title order={4}>Quantity</Title>
            <ItemCounter mt="xs" />
          </Box>
          {/* Agregar al carrito */}
          <Button fullWidth>Add to cart</Button>
          {/*<Chip variant="outline" checked={false}>*/}
          {/*  No disponible*/}
          {/*</Chip>*/}
          {/*  Descripción */}
          <Box mt="xl">
            <Title order={4}>Description</Title>
            <Text>{productQuery.data.description}</Text>
          </Box>
        </Grid.Col>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const { slug } = ctx.params as { slug: string };

  const product = await queryClient.fetchQuery(['product', slug], () =>
    dbProducts.getProductsBySlug(slug)
  );

  if (!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
