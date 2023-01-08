import { Box, Button, Grid, Text, Title } from '@mantine/core';
import { ShopLayout } from '../../components/Layouts';
import { ProductCarousel, SizeSelector } from '../../components/Products';
import { ItemCounter } from '../../components/UI';
import { initialData } from '../../database/products';

const product = initialData.products[0];

export const ProductPage = () => (
  <ShopLayout title={product.title} description={product.description}>
    <Grid>
      <Grid.Col xs={12} sm={7}>
        {/* Carrusel */}
        <ProductCarousel images={product.images} />
      </Grid.Col>
      <Grid.Col xs={12} sm={5}>
        {/* Titulo */}
        <Box>
          <Title order={1}>{product.title}</Title>
          <Title order={2}>${product.price}</Title>
        </Box>
        {/* Tallas */}
        <Box my="xl">
          <Title order={4}>Size</Title>
          <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes} mt="xs" />
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
          <Text>{product.description}</Text>
        </Box>
      </Grid.Col>
    </Grid>
  </ShopLayout>
);
export default ProductPage;
