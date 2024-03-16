import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import { IconArrowNarrowRight, IconLogout, IconSearch } from '@tabler/icons-react';
import React from 'react';

import { useAuthContext } from '@/hooks/context';
import { CustomIconLink } from './CustomIconLink';
import { CustomLink } from './CustomLink/CustomLink';
import { useLinksData } from './useLinksData';
import { LinkData } from './types';

type ComponentToRender = typeof CustomIconLink | typeof CustomLink;

export const Navbar = () => {
  const { user, isLoggedIn, logoutUser } = useAuthContext();
  const { userRoutes, guestRoutes, adminRoutes } = useLinksData();

  const renderLinks = (routes: LinkData[], Component: ComponentToRender) =>
    routes.map((route) => <Component {...route} key={route.href} />);

  return (
    <AppShell.Navbar>
      {/* HEADER SECTION */}
      <AppShell.Section>
        {isLoggedIn && (
          <Center my="md" visibleFrom="sm">
            <Avatar
              size={50}
              radius="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
          </Center>
        )}

        {/* SEARCH */}
        <Box m="md" hiddenFrom="sm">
          <Input
            leftSection={<IconSearch size={14} />}
            placeholder="Search"
            radius="lg"
            rightSection={
              <ActionIcon radius="xl" variant="filled">
                <IconArrowNarrowRight />
              </ActionIcon>
            }
            onClick={spotlight.open}
          />
        </Box>
      </AppShell.Section>

      {/* BODY SECTION */}
      <AppShell.Section my={{ base: 'md', sm: 'xs' }} grow>
        <Stack justify="center" align="center" gap="5" visibleFrom="sm">
          {isLoggedIn
            ? renderLinks(userRoutes, CustomIconLink)
            : renderLinks(guestRoutes, CustomIconLink)}

          {isLoggedIn && user?.role === 'admin' && (
            <>
              <Divider label="Admin" labelPosition="center" my="sm" />
              {renderLinks(adminRoutes, CustomIconLink)}
            </>
          )}
        </Stack>
        <Stack align="start-flex" gap="0" hiddenFrom="sm">
          {isLoggedIn ? renderLinks(userRoutes, CustomLink) : renderLinks(guestRoutes, CustomLink)}

          {isLoggedIn && user?.role === 'admin' && (
            <>
              <Divider label="Admin" labelPosition="center" my="sm" />
              {renderLinks(adminRoutes, CustomLink)}
            </>
          )}
        </Stack>
      </AppShell.Section>

      {/* FOOTER SECTION */}
      <AppShell.Section>
        <Divider />
        {/* USER AVATAR & EMAIL */}
        {isLoggedIn && (
          <>
            <Flex m="md" hiddenFrom="sm" justify="space-between">
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
              <ActionIcon
                variant="transparent"
                color="brown"
                size="xl"
                radius="lg"
                onClick={logoutUser}
              >
                <IconLogout size="2rem" />
              </ActionIcon>
            </Flex>
            <Center my="md" visibleFrom="sm">
              <Tooltip label="Cerrar sesión">
                <ActionIcon
                  variant="transparent"
                  color="brown"
                  size="xl"
                  radius="lg"
                  onClick={logoutUser}
                >
                  <IconLogout size="2rem" />
                </ActionIcon>
              </Tooltip>
            </Center>
          </>
        )}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
