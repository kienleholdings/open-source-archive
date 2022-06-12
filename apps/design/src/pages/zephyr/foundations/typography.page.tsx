import { Col, Div, H1, H2, P, Row, Sidebar, Switch } from '@kienleholdings/zephyr-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ZEPHYR_SIDEBAR_ITEMS } from 'constants/sidebarItems';

function Typography() {
  const [showMobileSizes, setShowMobileSizes] = useState(false);
  const router = useRouter();
  return (
    <Row gutter wrap>
      <Col md="3">
        <Sidebar activeItem={router.pathname} menuItems={ZEPHYR_SIDEBAR_ITEMS} />
      </Col>
      <Col md="9">
        <H1>Typography</H1>
        <P type="body-xl">
          Typography helps us clarify information hierarchy and communicate important content to the
          user
        </P>
        <P className="mb-64">
          In addition to all that, font can be a great way to express your brand! By default in
          Zephyr we love using Inter Extra Bold for headings and Source Sand Pro for the rest of the
          application. We think that these fonts are super legible while also providing our
          signature &quot;big and bold&quot; style we love so much.
        </P>
        <div className="flex items-center mb-16">
          <H2 className="flex-grow" paragraphSpacing={false}>
            Font Sizes
          </H2>
          <Switch
            label="Mobile Font Sizes"
            name="fontSize"
            onChange={setShowMobileSizes}
            value={showMobileSizes}
          />
        </div>
        <div className="bg-raised-light dark:bg-raised-dark px-32 py-24 rounded shadow-level-4">
          <Div desktop={!showMobileSizes} mobile={showMobileSizes} type="h1">
            Heading 1
          </Div>
          <Div desktop={!showMobileSizes} mobile={showMobileSizes} type="h2">
            Heading 2
          </Div>
          <Div desktop={!showMobileSizes} mobile={showMobileSizes} type="h3">
            Heading 3
          </Div>
          <Div desktop={!showMobileSizes} mobile={showMobileSizes} type="h4">
            Heading 4
          </Div>
          <Div desktop={!showMobileSizes} mobile={showMobileSizes} type="h5">
            Heading 5
          </Div>
          <Div desktop={!showMobileSizes} mobile={showMobileSizes} type="h6">
            Heading 6
          </Div>
        </div>
      </Col>
    </Row>
  );
}

export default Typography;
