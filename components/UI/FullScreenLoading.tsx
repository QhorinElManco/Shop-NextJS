import { Box, Flex, Loader, Text } from '@mantine/core';

export const FullScreenLoading = () => (
  <Box h="calc(100vh - 200px)" w="100%">
    <Flex direction="column" justify="center" align="center" gap="md" h="100%">
      <Loader />
      <Text>Loading...</Text>
    </Flex>
  </Box>
);
