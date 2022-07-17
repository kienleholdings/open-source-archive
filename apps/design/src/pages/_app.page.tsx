import { usePreferDarkMode } from '@kienleholdings/hooks';
import { Navbar, Container } from '@kienleholdings/zephyr-react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import '@kienleholdings/zephyr-core/zephyr-core.css';

import darkLogo from '../../public/kienle-design-logo-dark.svg';
import lightLogo from '../../public/kienle-design-logo-light.svg';

const ROUTES_WITH_SIDEBAR = ['/zephyr'];

function ExampleApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const containerSize = useMemo(
    () =>
      ROUTES_WITH_SIDEBAR.some((path) => router.pathname.includes(path))
        ? 'three-column'
        : 'long-form',
    [router.pathname]
  );

  const isDarkMode = usePreferDarkMode();

  const leftContent = useMemo(
    () => (
      <Image
        alt="Kienle Design Logo"
        height={40}
        layout="fixed"
        src={isDarkMode ? darkLogo : lightLogo}
        width={161}
      />
    ),
    [isDarkMode]
  );

  // Prop spreading is required by NextJS here and reasonable to allow
  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen w-screen md:left-auto">
      <Navbar
        containerSize={containerSize}
        leftContent={leftContent}
        menuItems={[
          { display: 'Home', value: '/' },
          { display: 'Zephyr', value: '/zephyr' },
        ]}
        sticky
      />
      <div className="md:pt-32">
        <Container size={containerSize}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Container>
      </div>
    </div>
  );
}

export default ExampleApp;
