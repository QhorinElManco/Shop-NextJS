import { Anchor, Flex } from '@mantine/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { LinkData } from '../types';
import classes from './CustomLink.module.css';

interface CustomLinkProps extends LinkData {}

export const CustomLink = ({ icon: Icon, label, href }: CustomLinkProps) => {
  const { asPath } = useRouter();
  const active = asPath === href;

  return (
    <Anchor
      component={NextLink}
      href={href}
      mod={{ active }}
      classNames={{ root: classes['anchor-root'] }}
    >
      <Flex align="center" gap="sm" p="xs">
        <Icon size={20} />
        {label}
      </Flex>
    </Anchor>
  );
};
