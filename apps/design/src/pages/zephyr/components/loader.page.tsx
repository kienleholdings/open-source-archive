import { Col, H1, H2, H3, Loader, P, Row, Sidebar } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';

import Code from 'components/zephyr/Code';
import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function LoaderPage() {
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3" className="">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Loader</H1>
        <P>
          Loaders are used to notify users that a process that they initiated is still in progress.
          These should be used only when it&apos;s not possible to use a skeleton (i.e. in a button)
        </P>
        <H2>Usage</H2>
        <Code>
          {`import { Loader } from '@kienleholdings/zephyr-react';

<Loader />`}
        </Code>
        <H2>Examples</H2>
        <H3>Default</H3>
        <Loader className="mb-16" />
        <Code>{`<Loader />`}</Code>
      </Col>
    </Row>
  );
}

export default LoaderPage;
