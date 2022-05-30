import { Button } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import RadioGroup from './RadioGroup';

const validationSchema = Yup.object().shape({
  testGroup: Yup.string().required('Test Radio Group is Required'),
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
    </Formik>
  );
}
