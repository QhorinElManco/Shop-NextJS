import { ActionIcon, Tooltip } from '@mantine/core';
import { Icon as TablerIcon } from '@tabler/icons-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  icon: TablerIcon;
  label: string;
  href: string;
}

const NavBarIconLink: FC<Props> = ({ icon: Icon, label, href }) => {
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
        <Icon size="1.5rem" />
      </ActionIcon>
    </Tooltip>
  );
};

export default NavBarIconLink;
