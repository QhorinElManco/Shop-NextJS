import { ActionIcon, Anchor, Box, Center, MediaQuery, Stack, Tooltip } from '@mantine/core';
import { Icon as TablerIcon } from '@tabler/icons-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  icon: TablerIcon;
  label: string;
  href: string;
}

export const NavbarLinks: FC<Props> = ({ icon: Icon, label, href }) => {
  const { asPath } = useRouter();
  const active = asPath === href;

  // TODO: Agregar Stack para cargar tanto el DOM
  return (
    <>
      <Stack justify="center" align="center" spacing="sm">
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
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
        </MediaQuery>
      </Stack>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Anchor component={NextLink} href={href}>
          <Box className={`navbar-link-with-icon ${active && 'navbar-link-with-icon-active'}`}>
            <Center inline>
              <Icon />
              <Box ml="sm">{label}</Box>
            </Center>
          </Box>
        </Anchor>
      </MediaQuery>
    </>
  );
};
