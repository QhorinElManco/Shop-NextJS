import React, { FC } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Input,
  MediaQuery,
  Navbar as MantineNavbar,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowNarrowRight,
  IconCalendarStats,
  IconFingerprint,
  IconGardenCart,
  IconHome2,
  IconListDetails,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
  IconUserCircle,
} from '@tabler/icons';
import NavBarIconLink from './NavBarIconLink';
import NavBarLink from './NavBarLink';

interface Props {
  hidden: boolean;
}

const listMenu = [
  {
    icon: IconHome2,
    label: 'Home',
    href: '/',
  },
  {
    icon: IconUserCircle,
    label: 'Profile',
    href: '/user-profile',
  },
  {
    icon: IconListDetails,
    label: 'My orders',
    href: '/analytics',
  },
  {
    icon: IconCalendarStats,
    label: 'Products',
    href: '/releases',
  },
  {
    icon: IconUser,
    label: 'Account',
    href: '/account',
  },
  {
    icon: IconFingerprint,
    label: 'Security',
    href: '/security',
  },
  {
    icon: IconSettings,
    label: 'Settings',
    href: '/settings',
  },
];
// TODO: CORREGIR PADDING EN NAVBAR
export const Navbar: FC<Props> = ({ hidden }) => {
  const theme = useMantineTheme();
  return (
    <MantineNavbar
      width={{
        xs: 300,
        sm: 80,
        md: 80,
      }}
      hidden={hidden}
      hiddenBreakpoint="sm"
    >
      {/*<Container mx="md">*/}
      {/* HEADER SECTION */}

      <MantineNavbar.Section>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Center my="md">
            <Avatar
              size={50}
              radius="xl"
              color="dark"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
          </Center>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box mx="md">
            <Input
              icon={<IconSearch size={14} />}
              placeholder="Search"
              radius="lg"
              rightSection={
                <ActionIcon radius="xl" color={theme.fn.primaryColor()} variant="filled">
                  <IconArrowNarrowRight />
                </ActionIcon>
              }
            />
          </Box>
        </MediaQuery>
      </MantineNavbar.Section>

      <Divider />
      {/* BODY SECTION */}

      <MantineNavbar.Section my="md" grow>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box>
            <NavBarLink icon={IconGardenCart} label="Cart" href="/cart" />
          </Box>
        </MediaQuery>

        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box>
            {listMenu.map((item) => (
              <NavBarLink icon={item.icon} label={item.label} href={item.href} key={item.label} />
            ))}
          </Box>
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Stack justify="center" align="center" spacing="sm">
            {listMenu.map((item) => (
              <NavBarIconLink
                icon={item.icon}
                label={item.label}
                href={item.href}
                key={item.href}
              />
            ))}
          </Stack>
        </MediaQuery>
      </MantineNavbar.Section>

      {/* FOOTER SECTION */}

      <MantineNavbar.Section>
        <Divider />
        {/* USER AVATAR & EMAIL */}
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box m="md">
            <Group position="apart">
              <Group>
                <Avatar
                  radius="xl"
                  color="dark"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
                <Box>
                  <Title order={4}>Maynor Pineda</Title>
                  <Text size="sm">sbethuell@gmail.com</Text>
                </Box>
              </Group>
              <ActionIcon variant="transparent" color="brown" size="xl" radius="lg">
                <IconLogout size={theme.fontSizes.sm * 2} />
              </ActionIcon>
            </Group>
          </Box>
        </MediaQuery>
        {/* LOGOUT ICON */}
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Center my="md">
            <Tooltip label="Cerrar sesión">
              <ActionIcon variant="transparent" color="brown" size="xl" radius="lg">
                <IconLogout size={theme.fontSizes.sm * 2} />
              </ActionIcon>
            </Tooltip>
          </Center>
        </MediaQuery>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};