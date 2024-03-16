import { Anchor, Flex, Stack, Title } from '@mantine/core';
import { IconShoppingCartOff } from '@tabler/icons-react';
import NextLink from 'next/link';

import { ShopLayout } from '@/components/layouts';

export const EmptyPage = () => (
  <ShopLayout title="Empty cart" description="The cart is empty">
    <Flex mih="400px" align="center" justify="center">
      <Stack align="center">
        <IconShoppingCartOff size={100} strokeWidth={1.2} />
        <Stack align="center">
          <Title order={2}>Your cart is empty</Title>
          <Anchor c="blue.8" component={NextLink} href="/">
            Back to home
          </Anchor>
        </Stack>
      </Stack>
    </Flex>
  </ShopLayout>
);

export default EmptyPage;
