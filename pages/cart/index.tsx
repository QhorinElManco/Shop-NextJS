import { Box, Button, Card, Divider, Grid, Space, Title } from '@mantine/core';
import { CartList, OrderSummary } from 'components/cart';
import { ShopLayout } from 'components/layouts';
import { useCartContext } from 'hooks/context';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const CartPage = () => {
  const { isLoaded, cart } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty').then();
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout title="Cart" description="My cart">
      <Title order={3}>My cart</Title>
      <Space h="md" />
      <Grid>
        <Grid.Col xs={12} sm={7}>
          <CartList editable />
        </Grid.Col>
        <Grid.Col xs={12} sm={5}>
          <Card shadow="md" withBorder>
            <Title order={2}>Order</Title>
            <Divider my="md" />
            <OrderSummary />
            <Box mt="xl">
              <Button component={NextLink} size="xs" href="/checkout/address" fullWidth>
                Checkout
              </Button>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
