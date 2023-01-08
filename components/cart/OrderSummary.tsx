import { SimpleGrid, Text } from '@mantine/core';

export const OrderSummary = () => (
  <>
    <SimpleGrid cols={2}>
      <Text>No. Products</Text>
      <Text align="right">3 items</Text>
    </SimpleGrid>

    <SimpleGrid cols={2} mt={4}>
      <Text>Subtotal</Text>
      <Text align="right">$155.36</Text>
    </SimpleGrid>

    <SimpleGrid cols={2} mt={4}>
      <Text>Taxation (15%)</Text>
      <Text align="right">$35.34</Text>
    </SimpleGrid>

    <SimpleGrid cols={2} mt={4}>
      <Text>
        <strong>Total</strong>
      </Text>
      <Text align="right">
        <strong>$186.34</strong>
      </Text>
    </SimpleGrid>
  </>
);
