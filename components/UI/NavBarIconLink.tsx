import { ActionIcon, Tooltip, useMantineTheme } from '@mantine/core';
import NextLink from 'next/link';
import { TablerIcon } from '@tabler/icons';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface Props {
  icon: TablerIcon;
  label: string;
  href: string;
}

const NavBarIconLink: FC<Props> = ({ icon: Icon, label, href }) => {
  const theme = useMantineTheme();
  const { asPath } = useRouter();
  return (
    <Tooltip label={label}>
      <ActionIcon
        component={NextLink}
        variant={asPath === href ? 'filled' : 'transparent'}
        color="brown"
        size="xl"
        href={href}
        radius="xl"
      >
        <Icon size={theme.fontSizes.sm * 2} />
      </ActionIcon>
    </Tooltip>
  );
};

export default NavBarIconLink;
