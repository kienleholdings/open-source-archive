import { Button } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Checkbox from './Checkbox';

const validationSchema = Yup.object().shape({
  item1: Yup.boolean().oneOf([true], 'Item 1 is required'),
  item2: Yup.boolean().oneOf([true], 'Item 2 is required'),
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
        <Checkbox label="Item 1" name="item1" />
        <Checkbox label="Item 2" isLastInGroup name="item2" />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
