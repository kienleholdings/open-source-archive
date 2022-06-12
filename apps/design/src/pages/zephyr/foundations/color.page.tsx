import { Col, H1, H2, P, Row, Sidebar } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';

import ColorBlock from 'components/zephyr/ColorBlock';
import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function Color() {
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Color</H1>
        <P type="body-xl">
          We love using big, bold pops of color to help beautify our interface and nudge users in
          the right direction.
        </P>
        <P className="mb-64">
          Color is a great way to direct users to actions, provide feedback, and help users
          visualize data. With that being said, we do have a few guidelines for how to properly use
          color inside of Zephyr. These guidelines help ensure that your app remains accessible and
          drives the users towards the correct focal points.
        </P>
        <H2>Default Theme Colors</H2>
        <Row className="mb-32" wrap>
          <Col xs="12" md="4">
            <ColorBlock color="primary" />
          </Col>
          <Col xs="12" md="4">
            <ColorBlock color="accent" />
          </Col>
          <Col xs="12" md="4">
            <ColorBlock color="error" />
          </Col>
        </Row>
        <div className="bg-bg-light dark:mt-32 mb-32 -mx-32 px-32 py-32">
          <H2 className="text-fg-light dark:text-fg-light">Light Mode Colors</H2>
          <Row wrap>
            <Col xs="12" md="4">
              <ColorBlock color="type-light" light />
            </Col>
            <Col xs="12" md="4">
              <ColorBlock color="raised-light" light />
            </Col>
            <Col xs="12" md="4">
              <ColorBlock color="border-light" light />
            </Col>
          </Row>
        </div>
        <div className="bg-bg-dark mb-32 -mx-32 px-32 py-32">
          <H2 className="text-fg-dark">Dark Mode Colors</H2>
          <Row wrap>
            <Col xs="12" md="4">
              <ColorBlock color="type-dark" dark />
            </Col>
            <Col xs="12" md="4">
              <ColorBlock color="raised-dark" dark />
            </Col>
            <Col xs="12" md="4">
              <ColorBlock color="border-dark" dark />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default Color;
