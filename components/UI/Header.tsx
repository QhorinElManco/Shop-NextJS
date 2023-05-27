import {
  ActionIcon,
  Burger,
  Container,
  Group,
  Indicator,
  Input,
  Header as MantineHeader,
  MediaQuery,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useSpotlight } from '@mantine/spotlight';
import { IconGardenCart, IconSearch } from '@tabler/icons-react';
import { useCart } from 'hooks';
import NextLink from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<Props> = ({ opened, setOpened }) => {
  const spotlight = useSpotlight();
  const { numberOfItems } = useCart();
  return (
    <MantineHeader height={{ base: 60 }}>
      <Container className="header-content" fluid>
        <Group>
          <MantineLogo size={28} />
        </Group>
        <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
          <Group>
            <Input
              icon={<IconSearch size={14} />}
              placeholder="Search"
              radius="lg"
              onClick={() => spotlight.openSpotlight()}
            />
          </Group>
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group>
            <NextLink href="/cart" passHref>
              <Indicator
                size={15}
                processing
                color="brown.4"
                label={numberOfItems > 9 ? '+9' : numberOfItems}
                disabled={numberOfItems === 0}
                inline
              >
                <ActionIcon size="md" color="primary" variant="transparent">
                  <IconGardenCart size={30} />
                </ActionIcon>
              </Indicator>
            </NextLink>
          </Group>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" />
        </MediaQuery>
      </Container>
    </MantineHeader>
  );
};
