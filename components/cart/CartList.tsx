import { Anchor, Box, Button, Grid, Image, Text, Title } from '@mantine/core';
import { ItemCounter } from 'components/UI';
import { useCartContext } from 'hooks/context';
import { ICartProduct, IOrderItem } from 'interfaces';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products = [] }) => {
  const { cart, updateProductQuantity, deleteProductFromCart } = useCartContext();

  const productsToShow = products.length > 0 ? products : cart;
  const _editable = products.length > 0 ? false : editable;

  return (
    <>
      {productsToShow.map((product) => (
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
              {_editable ? (
                <ItemCounter
                  mt="xs"
                  currentValue={product.quantity}
                  onChangeQuantity={(quantity) => {
                    updateProductQuantity({ ...product, quantity } as ICartProduct);
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
            {_editable && (
              <Button
                size="xs"
                variant="subtle"
                onClick={() => deleteProductFromCart(product as ICartProduct)}
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
