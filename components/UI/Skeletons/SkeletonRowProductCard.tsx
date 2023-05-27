import { Flex } from '@mantine/core';
import { SkeletonProductCard } from './SkeletonProductCard';

export const SkeletonRowProductCard = () => (
  <Flex miw="100%" mih="40vh" gap="md" direction={{ base: 'column', md: 'row' }} mb={50}>
    <SkeletonProductCard />
    <SkeletonProductCard />
    <SkeletonProductCard />
    <SkeletonProductCard />
  </Flex>
);
