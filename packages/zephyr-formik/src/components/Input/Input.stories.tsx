import { Button } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Input from './Input';

const validationSchema = Yup.object().shape({
  formikText: Yup.string().required('Text Input is required'),
});

export function WithValidation() {
  return (
    <Formik
      initialValues={{ formikTextArea: 'foo' }}
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
    </Formik>
  );
}
