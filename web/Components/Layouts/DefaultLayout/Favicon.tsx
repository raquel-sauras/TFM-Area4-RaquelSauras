import Head from 'next/head';
import { FC } from 'react';

export const Favicon: FC = () => {
  return (
    <Head>
        <link rel="icon" href="/favicon-32x32.png" />
    </Head>
  );
};
