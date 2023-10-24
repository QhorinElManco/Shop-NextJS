import {
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { tesloAPI } from 'api';
import { dbOrders, dbUsers } from 'database';
import { IOrder } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { Session, getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import authOptions from 'pages/api/auth/[...nextauth]';
import { useState } from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

export type OrderResponseBody = {
  id: string;
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED' | 'CREATED';
};

interface OrderPageProps {
  order: IOrder;
}

export const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const productQuantity = order.orderItems.reduce((acc, product) => acc + product.quantity, 0);

  const { shippingAddress } = order;

  const onOrderCompleted = async (details: OrderResponseBody) => {
    setIsLoading(true);
    if (details.status !== 'COMPLETED') {
      alert('Order not completed');
    }

    try {
      await tesloAPI.post('/orders/pay', {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert('Order not completed');
    }
  };

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

            <Text mt={5}>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</Text>
            <Text mt={5}>{shippingAddress.address}</Text>
            <Text mt={5}>{shippingAddress.address2}</Text>
            <Text mt={5}>{shippingAddress.country}</Text>
            <Text mt={5}>{shippingAddress.postalCode}</Text>

            <Divider my="md" />

            <OrderSummary order={order} />

            <Box mt="xl">
              {isLoading ? (
                <Center>
                  <Loader />
                </Center>
              ) : (
                <Box>
                  {order.isPaid ? (
                    <Badge color="green" variant="filled" size="lg" fullWidth>
                      Paid order
                    </Badge>
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) =>
                        actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        })
                      }
                      onApprove={(data, actions) =>
                        actions.order!.capture().then((details) => onOrderCompleted(details))
                      }
                    />
                  )}
                </Box>
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
