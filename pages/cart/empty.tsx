import { Anchor, Box, Title } from '@mantine/core';
import { IconShoppingCartOff } from '@tabler/icons';
import NextLink from 'next/link';
import { ShopLayout } from '../../components/Layouts';

export const EmptyPage = () => (
  <ShopLayout title="Empty cart" description="The cart is empty">
    <Box className="container-404">
      <IconShoppingCartOff size={100} strokeWidth={1.2} />
      <Box className="empty-cart">
        <Title order={2}>Your cart is empty</Title>
        <Anchor size="sm" color="blue.8" component={NextLink} href="/">
          Back to home
        </Anchor>
      </Box>
    </Box>
  </ShopLayout>
);

export default EmptyPage;
