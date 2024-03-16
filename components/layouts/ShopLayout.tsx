import { AppShell } from '@mantine/core';
import Head from 'next/head';
import React, { FC, ReactNode, useState } from 'react';
import { Header, Navbar } from '@/components/UI';

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
        header={{ height: 60 }}
        navbar={{
          width: {
            xs: 300,
            sm: 75,
          },
          collapsed: { mobile: !opened },
          breakpoint: 'sm',
        }}
        padding="xl"
      >
        <AppShell.Header>
          <Header opened={opened} setOpened={setOpened} />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
};
