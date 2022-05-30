import { Button } from '@kienleholdings/zephyr-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import SingleSelect from './SingleSelect';

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
    </Formik>
  );
}
