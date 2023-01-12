import { Anchor, Box, Button, Grid, Image, Text, Title } from '@mantine/core';
import { ItemCounter } from 'components/UI';
import { initialData } from 'database/products';
import NextLink from 'next/link';
import { FC } from 'react';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => (
  <>
    {productsInCart.map((product) => (
      <Grid gutter="sm" key={product.slug}>
        <Grid.Col xs={2}>
          <Anchor component={NextLink} href="product/slug">
            <Image
              width={100}
              src={`/products/${product.images[0]}`}
              radius="sm"
              fit="contain"
              alt={product.title}
              withPlaceholder
            />
          </Anchor>
        </Grid.Col>
        <Grid.Col xs={8}>
          <Box>
            <Title order={5}>{product.title}</Title>
            <Text>
              Talla: <strong>M</strong>
            </Text>
            {editable ? <ItemCounter mt="xs" /> : <Text>3 items</Text>}
          </Box>
        </Grid.Col>
        <Grid.Col xs={2} className="grid-content-center">
          <Text>{`$${product.price}`}</Text>
          {editable && (
            <Button size="xs" variant="subtle" compact>
              Remove
            </Button>
          )}
        </Grid.Col>
      </Grid>
      // <Title order={6} key={product.slug}>
      //   {product.slug}
      // </Title>
    ))}
  </>
);
