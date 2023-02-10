import { Box, Skeleton, Space } from '@mantine/core';

export const SkeletonProductCard = () => (
  <Box w="100%" h="100%">
    <Skeleton h="90%" w="100%" />
    <Space h="xs" />
    <Skeleton h={20} w="100%" />
    <Space h="xs" />
    <Skeleton h={20} w="10%" />
  </Box>
);
