import { Flex, Stack, Text, Title } from '@mantine/core';
import { ShopLayout } from 'components/layouts';

const Custom404Page = () => (
  <ShopLayout title="Page not found" description="Oops, there's nothing to show">
    <Flex mih="400px" align="center" justify="center">
      <Stack align="center">
        <Title order={1} size={60} fw={200}>
          404 |
        </Title>
        <Text ml="sm">Oops, there&apos;s nothing to show</Text>
      </Stack>
    </Flex>
  </ShopLayout>
);

export default Custom404Page;
