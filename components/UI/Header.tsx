import { ActionIcon, Burger, Flex, Indicator, Input } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { spotlight } from '@mantine/spotlight';
import { IconGardenCart, IconSearch } from '@tabler/icons-react';
import NextLink from 'next/link';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { useCartContext } from '@/hooks/context';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<Props> = ({ opened, setOpened }) => {
  const { numberOfItems } = useCartContext();

  return (
    <Flex justify="space-between" align="center" px="sm" h="100%">
      <MantineLogo size={28} />
      <Input
        leftSection={<IconSearch size={14} />}
        placeholder="Search"
        radius="lg"
        onClick={spotlight.open}
        visibleFrom="xs"
      />
      <Indicator
        size={15}
        processing
        color="red"
        label={numberOfItems > 9 ? '+9' : numberOfItems}
        disabled={numberOfItems === 0}
        visibleFrom="sm"
      >
        <ActionIcon component={NextLink} size="md" variant="transparent" href="/cart">
          <IconGardenCart size={30} />
        </ActionIcon>
      </Indicator>

      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size="sm"
        hiddenFrom="sm"
        styles={{ root: { '--burger-color': 'var(--mantine-primary-color-filled)' } }}
      />
    </Flex>
  );
};
