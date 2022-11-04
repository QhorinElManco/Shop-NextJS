import { TablerIcon } from '@tabler/icons';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { Box, Center } from '@mantine/core';

// TODO: TERMINAR LINKS DE NAVBAR EN PANTALLA PEQUEÑA

interface Props {
  icon: TablerIcon;
  label: string;
  href: string;
}

const NavBarLink: FC<Props> = ({ icon: Icon, label, href }) => {
  const { asPath } = useRouter();
  const active = asPath === href;
  return (
    <NextLink href={href}>
      <Box className={`navbar_link_with_icon ${active && 'navbar_link_with_icon_active'}`}>
        <Center inline>
          <Icon />
          <Box ml="sm">{label}</Box>
        </Center>
      </Box>
    </NextLink>
  );
};

export default NavBarLink;
