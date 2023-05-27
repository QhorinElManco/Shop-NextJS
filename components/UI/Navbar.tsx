import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Input,
  Navbar as MantineNavbar,
  MediaQuery,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
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
} from '@tabler/icons-react';
import { FC } from 'react';
import NavBarIconLink from './NavBarIconLink';
import LinksWithIcons from './NavBarLink';

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
  const spotlight = useSpotlight();
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
      {/* HEADER SECTION */}

      <MantineNavbar.Section>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Center my="md">
            <Avatar
              size={50}
              radius="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
          </Center>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box m="md">
            <Input
              icon={<IconSearch size={14} />}
              placeholder="Search"
              radius="lg"
              rightSection={
                <ActionIcon radius="xl" color={theme.fn.primaryColor()} variant="filled">
                  <IconArrowNarrowRight />
                </ActionIcon>
              }
              onClick={() => spotlight.openSpotlight()}
            />
          </Box>
        </MediaQuery>
      </MantineNavbar.Section>

      <Divider />
      {/* BODY SECTION */}

      <MantineNavbar.Section my="md" grow>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box>
            <LinksWithIcons icon={IconGardenCart} label="Cart" href="/cart" />
          </Box>
        </MediaQuery>

        {/* Links en pantallas pequeñas */}
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Box>
            {listMenu.map((item) => (
              <LinksWithIcons
                icon={item.icon}
                label={item.label}
                href={item.href}
                key={item.label}
              />
            ))}
          </Box>
        </MediaQuery>

        {/* Links en pantallas grandes */}
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
                <IconLogout size="2rem" />
              </ActionIcon>
            </Group>
          </Box>
        </MediaQuery>
        {/* LOGOUT ICON */}
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Center my="md">
            <Tooltip label="Cerrar sesión">
              <ActionIcon variant="transparent" color="brown" size="xl" radius="lg">
                <IconLogout size="2rem" />
              </ActionIcon>
            </Tooltip>
          </Center>
        </MediaQuery>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
