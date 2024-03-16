import { NumberFormatter, SimpleGrid, Text } from '@mantine/core';
import { FC } from 'react';

import { useCartContext } from '@/hooks';

interface OrderSummaryProps {
  order?: {
    total: number;
    numberOfItems: number;
    tax: number;
    subtotal: number;
  };
}

export const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  const orderValuesFromContext = useCartContext();
  const { total, numberOfItems, tax, subtotal } = order || orderValuesFromContext;

  return (
    // TODO: Agregar formato de moneda con next-intl
    <>
      <SimpleGrid cols={2}>
        <Text>No. Products</Text>
        <Text ta="right">
          {numberOfItems > 1 ? `${numberOfItems} items` : `${numberOfItems} item`}
        </Text>
      </SimpleGrid>

      <SimpleGrid cols={2} mt={4}>
        <Text>Subtotal</Text>
        <Text ta="right">
          <NumberFormatter prefix="$ " value={subtotal} />
        </Text>
      </SimpleGrid>

      <SimpleGrid cols={2} mt={4}>
        <Text>
          Taxation (
          {process.env.NEXT_PUBLIC_TAX_RATE ? Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 : 0} %)
        </Text>
        <Text ta="right">
          <NumberFormatter prefix="$ " value={tax} />
        </Text>
      </SimpleGrid>

      <SimpleGrid cols={2} mt={4}>
        <Text>
          <strong>Total</strong>
        </Text>
        <Text ta="right" fw={600}>
          <NumberFormatter prefix="$ " value={total} />
        </Text>
      </SimpleGrid>
    </>
  );
};
