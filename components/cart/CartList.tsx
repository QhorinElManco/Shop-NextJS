import {
  Anchor,
  Box,
  Button,
  Grid,
  Image,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import NextLink from 'next/link';
import { FC } from 'react';

import { ItemCounter } from '@/components/UI';
import { useCartContext } from '@/hooks';
import { ICartProduct, IOrderItem } from '@/interfaces';

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
          <Grid.Col span={2}>
            <Anchor component={NextLink} href={`product/${product.slug}`}>
              <Image
                width={100}
                src={`/products/${product.image}`}
                radius="sm"
                fit="contain"
                alt={product.title}
              />
            </Anchor>
          </Grid.Col>
          <Grid.Col span={8}>
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
          <Grid.Col span={2}>
            <Stack gap={0} align="center">
              <NumberFormatter prefix="$" value={product.price} />
              {_editable && (
                <Button
                  size="compact-xs"
                  variant="subtle"
                  onClick={() => deleteProductFromCart(product as ICartProduct)}
                >
                  Remove
                </Button>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      ))}
    </>
  );
};
