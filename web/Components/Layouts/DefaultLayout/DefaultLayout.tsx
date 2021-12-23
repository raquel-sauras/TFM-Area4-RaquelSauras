import Head from 'next/head';
import { FC } from 'react';

import { Footer } from '../Footer';
import { Favicon } from './Favicon';
import Script from 'next/script'

interface DefaultLayoutProps {
  title?: string | undefined;
  mainClassName?: string;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({
  title,
  children,
  mainClassName = 'container-fluid p-4'
}) => {
  return (
    <>
      <Head>
        <title>{title || 'YAMS'}</title>
      </Head>
        <Script
            src={'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js'}
            integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
            crossOrigin='anonymous'
        />
      <Favicon />

      <main className={mainClassName}>
        {children}
      </main>

      <Footer />
    </>
  );
};
