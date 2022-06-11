import { Navbar } from '@kienleholdings/zephyr-react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import { useMemo } from 'react';

import '@kienleholdings/zephyr-core/zephyr-core.css';

import darkLogo from '../../public/kienle-design-logo-dark.svg';
import lightLogo from '../../public/kienle-design-logo-light.svg';

function ExampleApp({ Component, pageProps }: AppProps) {
  let isDarkMode = false;
  if (typeof window !== 'undefined') {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')?.matches ?? false;
  }
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
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen w-screen">
      <Navbar
        color="transparent"
        containerSize="long-form"
        leftContent={leftContent}
        menuItems={[
          { display: 'Home', value: '/' },
          { display: 'Zephyr', value: '/zephyr' },
        ]}
        sticky
      />
      <div className="pt-16 md:pt-32">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default ExampleApp;
