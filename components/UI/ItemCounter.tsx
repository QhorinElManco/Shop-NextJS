import { ActionIcon, Group, GroupProps, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons';
import React, { FC } from 'react';
import { useCounter } from '@mantine/hooks';

interface Props {
  // stock: number;
}

export const ItemCounter: FC<Props & GroupProps> = ({ ...groupProps }) => {
  const [count, handlers] = useCounter(4, {
    min: 0,
    max: 10,
  });
  return (
    <Group {...groupProps}>
      <ActionIcon variant="outline" radius="xl" size="sm" onClick={handlers.decrement}>
        <IconMinus />
      </ActionIcon>
      <Text>{count}</Text>
      <ActionIcon variant="outline" radius="xl" size="sm" onClick={handlers.increment}>
        <IconPlus />
      </ActionIcon>
    </Group>
  );
};
