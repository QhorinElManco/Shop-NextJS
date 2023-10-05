import { SimpleGrid, Text } from '@mantine/core';
import { useCartContext } from 'hooks';
import { FC } from 'react';

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
        <Text align="right">
          {numberOfItems > 1 ? `${numberOfItems} items` : `${numberOfItems} item`}
        </Text>
      </SimpleGrid>

      <SimpleGrid cols={2} mt={4}>
        <Text>Subtotal</Text>
        <Text align="right">$ {subtotal}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2} mt={4}>
        <Text>Taxation ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100} %)</Text>
        <Text align="right">$ {tax}</Text>
      </SimpleGrid>

      <SimpleGrid cols={2} mt={4}>
        <Text>
          <strong>Total</strong>
        </Text>
        <Text align="right">
          <strong>$ {total}</strong>
        </Text>
      </SimpleGrid>
    </>
  );
};
