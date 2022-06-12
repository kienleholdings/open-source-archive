import { Col, H1, Link, P, Row, Sidebar } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';

import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function Components() {
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Components</H1>
        <P type="body-xl">
          Leveraging the power of React and TailwindCSS, Zephyr lets you go from concept to
          production in record time
        </P>
        <P className="mb-64">
          Unfortunately our documentation is pretty sparse right now. We&apos;ll be adding more here
          regularly, so be sure to check back! Luckily, we have a lot of code that you can take a
          look at free-of-charge on{' '}
          <Link
            href="https://github.com/kienleholdings/open-source/tree/main/packages/zephyr-react"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </P>
      </Col>
    </Row>
  );
}

export default Components;
