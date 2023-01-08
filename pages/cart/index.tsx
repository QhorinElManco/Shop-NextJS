import { Box, Button, Card, Divider, Grid, Space, Title } from '@mantine/core';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/Layouts';

export const CartPage = () => (
  <ShopLayout title="Cart" description="My cart">
    <Title order={3}>My cart</Title>
    <Space h="md" />
    <Grid>
      <Grid.Col xs={12} sm={7}>
        <CartList editable />
      </Grid.Col>
      <Grid.Col xs={12} sm={5}>
        <Card shadow="md" withBorder>
          {/*<Card.Section inheritPadding>*/}
          <Title order={2}>Order</Title>
          <Divider my="md" />
          <OrderSummary />
          <Box mt="xl">
            <Button size="xs" fullWidth>
              Checkout
            </Button>
          </Box>
          {/*</Card.Section>*/}
        </Card>
      </Grid.Col>
    </Grid>
  </ShopLayout>
);

export default CartPage;
