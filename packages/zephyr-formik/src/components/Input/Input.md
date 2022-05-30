Text

```js
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@kienleholdings/zephyr-react';

const validationSchema = Yup.object().shape({
  formikText: Yup.string().required('Text Input is required'),
});

<Formik
  initialValues={{ formikText: 'foo' }}
  onSubmit={(values) => {
    alert(JSON.stringify(values));
  }}
  validationSchema={validationSchema}
>
  <Form>
    <Input htmlType="text" label="Text Input" name="formikText" placeholder="Enter Something" />
    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
</Formik>;
```
