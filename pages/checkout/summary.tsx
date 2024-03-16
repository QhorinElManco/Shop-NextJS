import {
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { getCookie } from 'cookies-next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { useCartContext, useCountry } from '@/hooks';

export const SummaryPage = () => {
  const router = useRouter();
  const countryQuery = useCountry();
  const { shippingAddress, numberOfItems, createOrder } = useCartContext();
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const countryName =
    countryQuery?.data?.find((c) => c.code === shippingAddress?.country)?.name ?? '';

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setErrorMessage(message);
      setIsPosting(false);
      return;
    }

    await router.replace(`/orders/${message}`);
  };

  useEffect(() => {
    if (!getCookie('firstName')) {
      router.push('/checkout/address').then();
    }
  }, []);

  if (!shippingAddress) {
    return <></>;
  }

  return (
    <ShopLayout title="Order summary" description="Order summary">
      <Title order={3}>Order summary</Title>
      <Space h="md" />
      <Grid>
        <Grid.Col span={{ sm: 7 }}>
          <CartList />
        </Grid.Col>
        <Grid.Col span={{ sm: 5 }}>
          <Card shadow="md" withBorder>
            {numberOfItems > 1 ? (
              <Title order={2}>{`Summary (${numberOfItems} products)`}</Title>
            ) : (
              <Title order={2}>Summary (1 product)</Title>
            )}

            <Divider my="md" />

            <Group justify="apart">
              <Text size="lg">
                <strong>Delivery address</strong>
              </Text>
              <Anchor component={NextLink} href="/checkout/address" underline="always">
                Edit
              </Anchor>
            </Group>

            <Text mt={5}>
              {shippingAddress?.firstName} {shippingAddress?.lastName}
            </Text>
            <Text mt={5}>{shippingAddress?.address}</Text>
            <Text mt={5}>
              {shippingAddress?.address2} {shippingAddress?.postalCode}
            </Text>
            <Text mt={5}>{countryName}</Text>
            <Text mt={5}>{shippingAddress?.phoneNumber}</Text>

            <Divider my="md" />

            <Box className="grid-content-left">
              <Anchor component={NextLink} href="/cart/" underline="always">
                Edit
              </Anchor>
            </Box>

            <OrderSummary />

            <Flex mt="xl" direction="column" gap="md">
              {errorMessage && (
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title="Oops, an error has occurred!"
                  color="red"
                >
                  {errorMessage}
                </Alert>
              )}
              <Button size="xs" fullWidth onClick={onCreateOrder} disabled={isPosting}>
                Confirm order
              </Button>
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
