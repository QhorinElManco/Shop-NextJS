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
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import {
  IconArrowNarrowRight,
  IconCalendarStats,
  IconGardenCart,
  IconListDetails,
  IconLogout,
  IconSearch,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons-react';
import { useAuth } from 'hooks/context';
import { FC } from 'react';
import { NavbarLinks } from './NavbarLinks';

interface Props {
  hidden: boolean;
}

const userRoutes = [
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
];

const adminRoutes = [
  {
    icon: IconCalendarStats,
    label: 'Products',
    href: '/releases',
  },
  {
    icon: IconListDetails,
    label: 'Orders',
    href: '/analytics',
  },
  {
    icon: IconUsers,
    label: 'Users',
    href: '/users',
  },
];
// TODO: CORREGIR PADDING EN NAVBAR
export const Navbar: FC<Props> = ({ hidden }) => {
  const { user, isLoggedIn } = useAuth();
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
        {isLoggedIn && (
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Center my="md">
              <Avatar
                size={50}
                radius="xl"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              />
            </Center>
          </MediaQuery>
        )}
        {/* SEARCH */}
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

      {/* BODY SECTION */}
      <MantineNavbar.Section my="md" grow>
        <>
          {isLoggedIn && (
            <>
              <NavbarLinks icon={IconGardenCart} label="Cart" href="/cart" />
              {userRoutes.map((item) => (
                <NavbarLinks
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  key={item.label}
                />
              ))}
            </>
          )}

          {isLoggedIn && user?.role === 'admin' && (
            <>
              <Divider label="Admin" labelPosition="center" my="sm" />
              {adminRoutes.map((item) => (
                <NavbarLinks
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  key={item.label}
                />
              ))}
            </>
          )}
        </>
      </MantineNavbar.Section>

      {/* FOOTER SECTION */}

      <MantineNavbar.Section>
        <Divider />
        {/* USER AVATAR & EMAIL */}
        {isLoggedIn ? (
          <>
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
                      <Title order={4}>{user?.name}</Title>
                      <Text size="sm">{user?.email}</Text>
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
          </>
        ) : (
          <>
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
                      <Title order={4}>{user?.name}</Title>
                      <Text size="sm">{user?.email}</Text>
                    </Box>
                  </Group>
                  <ActionIcon variant="transparent" color="brown" size="xl" radius="lg">
                    <IconLogout size="2rem" />
                  </ActionIcon>
                </Group>
              </Box>
            </MediaQuery>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Center my="md">
                <Tooltip label="Cerrar sesión">
                  <ActionIcon variant="transparent" color="brown" size="xl" radius="lg">
                    <IconLogout size="2rem" />
                  </ActionIcon>
                </Tooltip>
              </Center>
            </MediaQuery>
          </>
        )}
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
