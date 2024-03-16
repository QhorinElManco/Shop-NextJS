import Head from 'next/head';
import React, { FC, ReactNode } from 'react';

import classes from './UnauthenticatedLayout.module.css';

interface Props {
  title: string;
  children: ReactNode;
}

export const UnauthenticatedLayout: FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <main className={classes['content-main']}>{children}</main>
  </>
);
