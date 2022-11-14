import { AppShell, Container } from '@mantine/core';
import { Header, Navbar } from 'components/UI';
import Head from 'next/head';
import React, { FC, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, description, imageFullUrl }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <AppShell
        header={<Header opened={opened} setOpened={setOpened} />}
        navbar={<Navbar hidden={!opened} />}
        navbarOffsetBreakpoint="sm"
      >
        <Container fluid>{children}</Container>
      </AppShell>
    </>
  );
};
