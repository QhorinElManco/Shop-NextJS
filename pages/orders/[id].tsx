import { Anchor, Box, Button, Card, Divider, Grid, Group, Space, Text, Title } from '@mantine/core';
import NextLink from 'next/link';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/Layouts';

export const OrderPage = () => (
  <ShopLayout title="Order summary ABC456" description="Order summary">
    <Title order={3}>Order: ABC456</Title>
    <Space h="md" />
    <Grid>
      <Grid.Col xs={12} sm={7}>
        <CartList />
      </Grid.Col>
      <Grid.Col xs={12} sm={5}>
        <Card shadow="md" withBorder>
          <Title order={2}>Summary (3 products)</Title>

          <Divider my="md" />

          <Group position="apart">
            <Text size="lg">
              <strong>Delivery address</strong>
            </Text>
            <Anchor component={NextLink} href="/checkout/address" underline>
              Edit
            </Anchor>
          </Group>

          <Text mt={5}>Maynor Pineda</Text>
          <Text mt={5}>2830 Santa Fe Road</Text>
          <Text mt={5}>San Diego, CA 92111</Text>
          <Text mt={5}>United States</Text>

          <Divider my="md" />

          <Box className="grid-content-left">
            <Anchor component={NextLink} href="/cart/" underline>
              Edit
            </Anchor>
          </Box>

          <OrderSummary />

          <Box mt="xl">
            <Button size="xs" fullWidth>
              Complete payment
            </Button>
          </Box>
        </Card>
      </Grid.Col>
    </Grid>
  </ShopLayout>
);

export default OrderPage;
