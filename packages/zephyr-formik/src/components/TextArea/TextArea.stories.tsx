import { Button } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextArea from './TextArea';

const validationSchema = Yup.object().shape({
  exampleSelect: Yup.string().required('Example Select is Required'),
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
        <TextArea label="Text Input" name="formikTextArea" placeholder="Enter Something" />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
