import { Col, H1, P, Row, Sidebar } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';

import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function Foundations() {
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Foundations</H1>
        <P type="body-xl">
          Every design system needs a solid foundation to build the rest of its components off of,
          Zephyr is no exception
        </P>
        <P className="mb-64">
          We believe that a design system is only as good as its smallest building blocks.
          That&apos;s why there&apos;s an entire section of this documentation dedicated to the
          foundations that make up Zephyr. In this section you&apos;ll find information on color,
          typography, spacing, depth, and more. The information presented in this section will be
          seen again and again throughout the rest of the system, making it a vital piece in
          understanding Zephyr.
        </P>
      </Col>
    </Row>
  );
}

export default Foundations;
