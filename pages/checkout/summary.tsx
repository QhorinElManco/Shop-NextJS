import { Anchor, Box, Button, Card, Divider, Grid, Group, Space, Text, Title } from '@mantine/core';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/Layouts';
import { useCartContext, useCountry } from '../../hooks';

export const SummaryPage = () => {
  const router = useRouter();
  const countryQuery = useCountry();
  const { shippingAddress, numberOfItems } = useCartContext();

  if (!shippingAddress) {
    return <></>;
  }

  const { firstName, lastName, address, address2, postalCode, country, phoneNumber } =
    shippingAddress;

  const countryName = countryQuery?.data?.find((c) => c.code === country)?.name ?? '';

  useEffect(() => {
    if (!getCookie('firstName')) {
      router.push('/checkout/address').then();
    }
  }, []);

  return (
    <ShopLayout title="Order summary" description="Order summary">
      <Title order={3}>Order summary</Title>
      <Space h="md" />
      <Grid>
        <Grid.Col xs={12} sm={7}>
          <CartList />
        </Grid.Col>
        <Grid.Col xs={12} sm={5}>
          <Card shadow="md" withBorder>
            {numberOfItems > 1 ? (
              <Title order={2}>{`Summary (${numberOfItems} products)`}</Title>
            ) : (
              <Title order={2}>Summary (1 product)</Title>
            )}

            <Divider my="md" />

            <Group position="apart">
              <Text size="lg">
                <strong>Delivery address</strong>
              </Text>
              <Anchor component={NextLink} href="/checkout/address" underline>
                Edit
              </Anchor>
            </Group>

            <Text mt={5}>
              {firstName} {lastName}
            </Text>
            <Text mt={5}>{address}</Text>
            <Text mt={5}>
              {address2} {postalCode}
            </Text>
            <Text mt={5}>{countryName}</Text>
            <Text mt={5}>{phoneNumber}</Text>

            <Divider my="md" />

            <Box className="grid-content-left">
              <Anchor component={NextLink} href="/cart/" underline>
                Edit
              </Anchor>
            </Box>

            <OrderSummary />

            <Box mt="xl">
              <Button size="xs" fullWidth>
                Confirm order
              </Button>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
