import { Alert, Col, H1, H2, H3, P, Row, Sidebar } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';

import Code from 'components/zephyr/Code';
import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function AlertPage() {
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3" className="">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Alert</H1>
        <P>
          Alerts provide highly-visible feedback for top-level actions. These can be used to show
          the user general status information, as well as surface errors in an easy to find way.
        </P>
        <H2>Usage</H2>
        <Code>
          {`import { Loader } from '@kienleholdings/zephyr-react';

<Loader />`}
        </Code>
        <H2>Examples</H2>
        <H3>Default</H3>
        <Alert>Hey there, I&apos;m an alert!</Alert>
        <Code>{`<Alert>Hey there, I'm an alert!</Alert>`}</Code>
        <H3>Error</H3>
        <Alert color="error">Uh oh, I&apos;m an error alert</Alert>
        <Code>{`<Alert color="error">Uh oh, I'm an error alert</Alert>`}</Code>
        <H3>Alert with Title</H3>
        <Alert title="I'm an Alert with a Title">Isn&apos;t that super cool?</Alert>
        <Code>{`<Alert title="I'm an Alert with a Title">Isn't that super cool?</Alert>`}</Code>
      </Col>
    </Row>
  );
}

export default AlertPage;
