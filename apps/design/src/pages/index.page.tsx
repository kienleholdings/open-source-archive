import { H1, P } from '@kienleholdings/zephyr-react';
import Head from 'next/head';

function Home() {
  return (
    <div>
      <Head>
        <title>Kienle Design</title>
        <meta
          name="description"
          content="Find documentation and resources for the Kienle Holdings design system and branding"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <H1>Welcome!</H1>
        <P type="body-xl">
          There&apos;s not much here yet, but rest assured we&apos;re working on it
        </P>
        <P>
          You can however find some pretty cool Zephyr documentation here. More information on
          things like branding and design blogs will be added soon.
        </P>
      </main>
    </div>
  );
}

export default Home;
