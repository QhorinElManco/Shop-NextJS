import { ActionIcon, Tooltip } from '@mantine/core';
import NextLink from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { LinkData } from './types';

interface Props extends LinkData {}
export const CustomIconLink = ({ label, href, icon: Icon }: Props) => {
  const { asPath } = useRouter();
  const variant = asPath === href ? 'filled' : 'transparent';

  return (
    <Tooltip label={label}>
      <ActionIcon component={NextLink} variant={variant} size="xl" href={href} radius="xl">
        <Icon size="1.5rem" />
      </ActionIcon>
    </Tooltip>
  );
};
