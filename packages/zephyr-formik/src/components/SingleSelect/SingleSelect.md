Single Select with Default Option

```js
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@kienleholdings/zephyr-react';

const validationSchema = Yup.object().shape({
  exampleSelect: Yup.string().required('Example Select is Required'),
});

<Formik
  initialValues={{ exampleSelect: '' }}
  onSubmit={(values) => {
    alert(JSON.stringify(values));
  }}
  validationSchema={validationSchema}
>
  <Form>
    <SingleSelect
      items={[
        {
          display: 'Item 1',
          value: 'item1',
        },
        {
          display: 'Item 2',
          value: 'item2',
        },
      ]}
      label="Example Select"
      name="exampleSelect"
    />
    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
</Formik>;
```
