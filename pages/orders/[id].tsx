import { Box, Button, Card, Divider, Grid, Group, Space, Text, Title } from '@mantine/core';
import { dbOrders, dbUsers } from 'database';
import { IOrder } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { Session, getServerSession } from 'next-auth';
import authOptions from 'pages/api/auth/[...nextauth]';
import { ShopLayout } from '../../components/Layouts';
import { CartList, OrderSummary } from '../../components/cart';

interface OrderPageProps {
  order: IOrder;
}

export const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  const productQuantity = order.orderItems.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <ShopLayout title="Order summary ABC456" description="Order summary">
      <Title order={3}>Order: {order._id}</Title>
      <Space h="md" />
      <Grid>
        <Grid.Col xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid.Col>
        <Grid.Col xs={12} sm={5}>
          <Card shadow="md" withBorder>
            <Title order={2}>
              Summary (
              {productQuantity > 1 ? `${productQuantity} products` : `${productQuantity} product`})
            </Title>

            <Divider my="md" />

            <Group position="apart">
              <Text size="lg">
                <strong>Delivery address</strong>
              </Text>
            </Group>

            <Text mt={5}>
              {`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
            </Text>
            <Text mt={5}>{order.shippingAddress.address}</Text>
            <Text mt={5}>{order.shippingAddress.address2}</Text>
            <Text mt={5}>{order.shippingAddress.country}</Text>
            <Text mt={5}>{order.shippingAddress.postalCode}</Text>

            <Divider my="md" />

            <OrderSummary order={order} />

            <Box mt="xl">
              {order.isPaid ? (
                <Button fullWidth>Complete payment</Button>
              ) : (
                <Button fullWidth>Pay</Button>
              )}
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id = '' } = query;
  const session: Session | null = await getServerSession(req, res, authOptions);

  const redirectTo = (path: string) => ({
    redirect: {
      destination: path,
      permanent: false,
    },
  });

  if (!session) {
    return redirectTo(`/auth/login?p=/orders/${id}`);
  }

  const order = await dbOrders.getOrderById(id.toString());
  const user = await dbUsers.getUserByEmail(session.user?.email ?? 'qwerty');

  if (!order) {
    return redirectTo('/orders/history');
  }

  if (!user) {
    return redirectTo(`/auth/login?p=/orders/${id}`);
  }

  if (order.user !== user.id) {
    return redirectTo('/orders/history');
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
