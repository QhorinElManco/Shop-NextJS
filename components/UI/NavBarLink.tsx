import { Anchor, Box, Center } from '@mantine/core';
import { Icon as TablerIcon } from '@tabler/icons-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  icon: TablerIcon;
  label: string;
  href: string;
}

const LinksWithIcons: FC<Props> = ({ icon: Icon, label, href }) => {
  const { asPath } = useRouter();
  const active = asPath === href;
  return (
    <Anchor component={NextLink} href={href}>
      <Box className={`navbar-link-with-icon ${active && 'navbar-link-with-icon-active'}`}>
        <Center inline>
          <Icon />
          <Box ml="sm">{label}</Box>
        </Center>
      </Box>
    </Anchor>
  );
};

export default LinksWithIcons;
