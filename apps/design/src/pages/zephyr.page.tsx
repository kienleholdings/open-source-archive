import { Card, Col, H1, Link, P, Row, Sidebar, Span } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';

import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function Zephyr() {
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Zephyr</H1>
        <P type="body-xl">
          Meet Zephyr, the Kienle Holdings design system built for React and TailwindCSS.
        </P>
        <P className="md:mb-32">
          This documentation is a bit of a work-in-progress, and in the end code always wins
          arguments. To deep-dive into the wonderful world of Zephyr, check it out on{' '}
          <Link
            href="https://github.com/kienleholdings/open-source/tree/main/packages/zephyr-core"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </P>
        <Row gutter wrap>
          <Col md="6">
            <Card header="Foundations">
              <Span>The core design styling that composes the rest of Zephyr</Span>
              <div className="flex flex-row-reverse">
                <Link className="mt-16" href="/zephyr/foundations">
                  View Foundations
                </Link>
              </div>
            </Card>
          </Col>
          <Col md="6">
            <Card header="Components">
              <Span>The interactive React component library built off for Zephyr</Span>
              <div className="flex flex-row-reverse">
                <Link className="mt-16" href="/zephyr/components">
                  View Components
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Zephyr;
