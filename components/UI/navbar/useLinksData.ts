import {
  IconCalendarStats,
  IconGardenCart,
  IconHome,
  IconListDetails,
  IconLogin,
  IconUserCircle,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { LinkData } from './types';

export const useLinksData = () => {
  const router = useRouter();

  const guestRoutes: LinkData[] = [
    {
      icon: IconHome,
      label: 'Home',
      href: '/',
    },
    {
      icon: IconLogin,
      label: 'Login',
      href: `/auth/login?p=${router.asPath}`,
    },
    {
      icon: IconUserPlus,
      label: 'Register',
      href: `/auth/register?p=${router.asPath}`,
    },
  ];

  const userRoutes: LinkData[] = [
    {
      icon: IconHome,
      label: 'Home',
      href: '/',
    },
    {
      icon: IconGardenCart,
      label: 'Cart',
      href: '/cart',
    },
    {
      icon: IconUserCircle,
      label: 'Profile',
      href: '/user-profile',
    },
    {
      icon: IconListDetails,
      label: 'My orders',
      href: '/orders/history',
    },
  ];

  const adminRoutes: LinkData[] = [
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

  return { guestRoutes, userRoutes, adminRoutes };
};
