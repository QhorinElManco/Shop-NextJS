import { Badge, Box, Button, Grid, Text, Title } from '@mantine/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { ShopLayout } from 'components/Layouts';
import { ProductCarousel, SizeSelector } from 'components/Products';
import { dbProducts } from 'database';
import { useCart } from 'hooks/context';
import { useProduct } from 'hooks/queries';
import { ICartProduct } from 'interfaces';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FullScreenLoading, ItemCounter } from '../../components/UI';

export const ProductPage = () => {
  const { query, push: routerPush } = useRouter();
  const { productQuery } = useProduct(query.slug as string);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct | null>(null);
  const { addProductToCart } = useCart();

  const onAddToCart = () => {
    if (!tempCartProduct || !tempCartProduct?.size) return;
    addProductToCart(tempCartProduct);
    routerPush('/cart');
  };

  useEffect(() => {
    if (!productQuery.data) return;
    setTempCartProduct({
      _id: productQuery.data._id,
      image: productQuery.data.images[0],
      price: productQuery.data.price,
      size: undefined,
      slug: productQuery.data.slug,
      title: productQuery.data.title,
      gender: productQuery.data.gender,
      quantity: 1,
    });
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return <FullScreenLoading />;
  }

  if (!productQuery.data || !tempCartProduct) {
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
              selectedSize={tempCartProduct.size}
              sizes={productQuery.data.sizes}
              onSelectedSize={(size) => setTempCartProduct({ ...tempCartProduct, size })}
            />
          </Box>
          {/* Cantidad */}
          <Box my="xl">
            <Title order={4}>Quantity</Title>
            <ItemCounter
              mt="xs"
              maxValue={productQuery.data.inStock}
              currentValue={tempCartProduct.quantity}
              onChangeQuantity={(quantity) => setTempCartProduct({ ...tempCartProduct, quantity })}
            />
          </Box>
          {/* Agregar al carrito */}
          {productQuery.data.inStock > 0 ? (
            <Button fullWidth onClick={onAddToCart}>
              {tempCartProduct.size ? 'Add to cart' : 'Select a size'}
            </Button>
          ) : (
            <Badge variant="light" size="xl" fullWidth>
              No disponible
            </Badge>
          )}
          {/* Descripción */}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();

  const { slug } = ctx.params as { slug: string };

  const product = await queryClient.fetchQuery({
    queryKey: ['product', slug],
    queryFn: () => dbProducts.getProductsBySlug(slug),
  });

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
    revalidate: 60 * 60 * 24,
  };
};
