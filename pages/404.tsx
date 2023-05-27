import { Box, Text, Title } from '@mantine/core';
import { ShopLayout } from 'components/Layouts';

const Custom404Page = () => (
  <ShopLayout title="Page not found" description="Oops, there's nothing to show">
    <Box className="container-404">
      <Title order={1} size={60} weight={200}>
        404 |
      </Title>
      <Text ml="sm">Oops, there&apos;s nothing to show</Text>
    </Box>
  </ShopLayout>
);

export default Custom404Page;
