import { ActionIcon, Group, GroupProps, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {
  maxValue?: number;
  currentValue: number;
  onChangeQuantity: (value: number) => void;
}

export const ItemCounter: FC<Props & GroupProps> = ({
  maxValue,
  currentValue,
  onChangeQuantity,
  ...groupProps
}) => {
  const handleIncrement = () => {
    if (maxValue && currentValue >= maxValue) return;
    onChangeQuantity(currentValue + 1);
  };

  const handleDecrement = () => {
    if (currentValue > 1) {
      onChangeQuantity(currentValue - 1);
    }
  };

  return (
    <Group {...groupProps}>
      <ActionIcon variant="outline" radius="xl" size="sm" onClick={handleDecrement}>
        <IconMinus />
      </ActionIcon>
      <Text>{currentValue}</Text>
      <ActionIcon variant="outline" radius="xl" size="sm" onClick={handleIncrement}>
        <IconPlus />
      </ActionIcon>
    </Group>
  );
};
