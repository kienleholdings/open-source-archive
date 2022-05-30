Two Radio Buttons with Validation on One

```js
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@kienleholdings/zephyr-react';

const validationSchema = Yup.object().shape({
  testGroup: Yup.string().required('Test Radio Group is Required'),
});

<Formik
  initialValues={{ testGroup: '' }}
  onSubmit={(values) => {
    alert(JSON.stringify(values));
  }}
  validationSchema={validationSchema}
>
  <Form>
    <RadioGroup
      items={[
        {
          display: 'Radio 1',
          value: 'radio1',
        },
        {
          display: 'Radio 2',
          value: 'radio2',
        },
      ]}
      label="Test Radio Group"
      name="testGroup"
    />
    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
</Formik>;
```
