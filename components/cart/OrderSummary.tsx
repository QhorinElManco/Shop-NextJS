import { SimpleGrid, Text } from '@mantine/core';
import { useCart } from 'hooks';

export const OrderSummary = () => {
  const { total, numberOfItems, tax, subtotal } = useCart();
  // TODO: Agregar formato de moneda con next-intl
  return (
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
