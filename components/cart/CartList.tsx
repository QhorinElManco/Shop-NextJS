import { Anchor, Box, Button, Grid, Image, Text, Title } from '@mantine/core';
import { ItemCounter } from 'components/UI';
import { useCart } from 'hooks';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateProductQuantity, deleteProductFromCart } = useCart();
  return (
    <>
      {cart.map((product) => (
        <Grid gutter="sm" key={`${product.slug} - ${product.size}`}>
          <Grid.Col xs={2}>
            <Anchor component={NextLink} href={`product/${product.slug}`}>
              <Image
                width={100}
                src={`/products/${product.image}`}
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
                Size: <strong>{product.size}</strong>
              </Text>
              {editable ? (
                <ItemCounter
                  mt="xs"
                  currentValue={product.quantity}
                  onChangeQuantity={(quantity) => {
                    updateProductQuantity({ ...product, quantity });
                  }}
                />
              ) : (
                <Text>
                  {product.quantity} {product.quantity > 1 ? 'products' : 'product'}
                </Text>
              )}
            </Box>
          </Grid.Col>
          <Grid.Col xs={2} className="grid-content-center">
            <Text>{`$${product.price}`}</Text>
            {editable && (
              <Button
                size="xs"
                variant="subtle"
                onClick={() => deleteProductFromCart(product)}
                compact
              >
                Remove
              </Button>
            )}
          </Grid.Col>
        </Grid>
      ))}
    </>
  );
};
